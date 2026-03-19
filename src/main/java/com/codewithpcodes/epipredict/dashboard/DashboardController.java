package com.codewithpcodes.epipredict.dashboard;

import com.codewithpcodes.epipredict.alert.Alert;
import com.codewithpcodes.epipredict.alert.AlertRepository;
import com.codewithpcodes.epipredict.clinicalCase.ClinicalCaseRepository;
import com.codewithpcodes.epipredict.district.DistrictRepository;
import com.codewithpcodes.epipredict.envReport.EnvReportRepository;
import com.codewithpcodes.epipredict.envReport.Status;
import com.codewithpcodes.epipredict.exceptions.ResourceNotFoundException;
import com.codewithpcodes.epipredict.user.User;
import com.codewithpcodes.epipredict.weather.Weather;
import com.codewithpcodes.epipredict.weather.WeatherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import com.codewithpcodes.epipredict.district.DistrictRepository;
import com.codewithpcodes.epipredict.user.Role;
import com.codewithpcodes.epipredict.user.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final WeatherRepository weatherRepository;
    private final EnvReportRepository envReportRepository;
    private final AlertRepository alertRepository;
    private final ClinicalCaseRepository clinicalCaseRepository;
    private final DistrictRepository districtRepository;
    private final UserRepository userRepository;

    @PreAuthorize("hasRole('CHW')")
    @GetMapping("/chw")
    public CHWDashboardStats getCHWDashboardStats(Authentication currentUser) {
        User user = (User) currentUser.getPrincipal();
        if (user == null || user.getDistrict() == null) {
            throw new ResourceNotFoundException("User not found or not assigned to a district.");
        }
        Long districtId = user.getDistrict().getId();

        Weather weather = weatherRepository.findTopByDistrictIdOrderByLogTimeDesc(districtId);
        long openReports = envReportRepository.countByDistrictIdAndStatus(districtId, Status.OPEN);
        Alert latestAlert = alertRepository.findTopByDistrictIdOrderByCreatedAtDesc(districtId).orElse(null);

        return CHWDashboardStats.builder()
                .currentTemp(weather != null ? weather.getTempCelsius() : 0)
                .currentHumidity(weather != null ? weather.getHumidityPercent() : 0)
                .currentRiskLevel(latestAlert != null ? latestAlert.getAlertLevel() : null)
                .riskRecommendation(latestAlert != null ? latestAlert.getRecommendation() : "No active alerts")
                .openReportsCount(openReports)
                .districtName(user.getDistrict().getName())
                .districtId(districtId)
                .build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public AdminDashboardStats getAdminDashboardStats() {
        long totalDistricts = districtRepository.count();
        long totalAgents = userRepository.countByRole(Role.CHW);
        long totalCases = clinicalCaseRepository.count();
        long totalReports = envReportRepository.count();
        double avgRisk = alertRepository.findAll().stream()
                .mapToDouble(Alert::getRiskScore)
                .average()
                .orElse(0.0);
        long pendingAlerts = alertRepository.findAll().stream()
                .filter(a -> !a.isAcknowledged())
                .count();

        return AdminDashboardStats.builder()
                .totalDistricts(totalDistricts)
                .totalAgents(totalAgents)
                .totalClinicalCases(totalCases)
                .totalEnvReports(totalReports)
                .averageRiskScore(avgRisk)
                .pendingAlerts(pendingAlerts)
                .build();
    }
}
