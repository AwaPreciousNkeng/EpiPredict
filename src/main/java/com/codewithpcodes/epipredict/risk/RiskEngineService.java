package com.codewithpcodes.epipredict.risk;

import com.codewithpcodes.epipredict.alert.Alert;
import com.codewithpcodes.epipredict.alert.AlertRepository;
import com.codewithpcodes.epipredict.clinicalCase.ClinicalCaseRepository;
import com.codewithpcodes.epipredict.district.District;
import com.codewithpcodes.epipredict.district.DistrictRepository;
import com.codewithpcodes.epipredict.envReport.EnvReportRepository;
import com.codewithpcodes.epipredict.envReport.Status;
import com.codewithpcodes.epipredict.exceptions.ResourceNotFoundException;
import com.codewithpcodes.epipredict.weather.Weather;
import com.codewithpcodes.epipredict.weather.WeatherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RiskEngineService {
    private final DistrictRepository districtRepository;
    private final EnvReportRepository envReportRepository;
    private final ClinicalCaseRepository clinicalCaseRepository;
    private final WeatherRepository weatherRepository;
    private final AlertRepository alertRepository;

    public void calculateRiskForDistrict(Long districtId) {
        District district = districtRepository.findById(districtId)
                .orElseThrow(() -> new ResourceNotFoundException("District not found."));

        long envCount = envReportRepository.countByDistrictIdAndStatus(districtId, Status.OPEN);
        long clinicalCount = clinicalCaseRepository.countByDistrictId(districtId);
        Weather weather = weatherRepository.findTopByDistrictIdOrderByLogTimeDesc(districtId);
        double rainfall = weather != null ? weather.getRainfallMm() : 0;

        double density = district.getPopulationDensity();

        double envScore = Math.min(envCount*5, 25);
        double clinicalScore = Math.min(clinicalCount*10, 40);
        double weatherScore = Math.min(rainfall*2, 20);
        double densityScore = Math.min(density/1000, 15);

        double totalRisk = envScore + clinicalScore + weatherScore + densityScore;
        RiskLevel level;

        if (totalRisk >= 70) level = RiskLevel.RED;
        else if (totalRisk >= 40) level = RiskLevel.YELLOW;
        else level = RiskLevel.GREEN;

        Alert alert = Alert.builder()
                .district(district)
                .riskScore(totalRisk)
                .alertLevel(level)
                .recommendation(generateRecommendation(level))
                .build();
        alertRepository.save(alert);
    }

    private String generateRecommendation(RiskLevel level) {
        return switch (level) {
            case RED -> "Deploy emergency response!";
            case YELLOW -> "Increase monitoring and sanitation efforts!";
            case GREEN -> "Normal surveillance";
        };
    }

    public void calculateRiskForAllDistricts() {
        List<District> districts = districtRepository.findAll();
        for (District district : districts) {
            calculateRiskForDistrict(district.getId());
        }
    }
}
