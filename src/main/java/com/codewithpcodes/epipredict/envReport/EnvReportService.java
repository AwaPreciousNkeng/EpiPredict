package com.codewithpcodes.epipredict.envReport;

import com.codewithpcodes.epipredict.district.District;
import com.codewithpcodes.epipredict.district.DistrictRepository;
import com.codewithpcodes.epipredict.exceptions.ResourceNotFoundException;
import com.codewithpcodes.epipredict.user.User;
import com.codewithpcodes.epipredict.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EnvReportService {
    private final EnvReportMapper mapper;
    private final EnvReportRepository repository;
    private final UserRepository userRepository;
    private final DistrictRepository districtRepository;

    public EnvReportResponse createReport(EnvReportRequest request, Authentication currentUser) {
        User reporter = userRepository.findById(Long.parseLong(currentUser.getName()))
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        District district = districtRepository.findById(request.districtId())
                .orElseThrow(() -> new ResourceNotFoundException("District not found."));

        EnvReport report = EnvReport.builder()
                .reporter(reporter)
                .district(district)
                .hazardTypes(request.hazardTypes())
                .description(request.description())
                .longitude(request.longitude())
                .latitude(request.latitude())
                .status(Status.OPEN)
                .reportTime(LocalDateTime.now())
                .build();
        repository.save(report);
        return mapper.toEnvReportResponse(report);
    }

    public List<EnvReportResponse> getAllReports() {
        return repository
                .findAll()
                .stream()
                .map(mapper::toEnvReportResponse)
                .toList();
    }

    public EnvReportResponse resolveReport(Long reportId) {
        EnvReport report = repository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found."));

        report.setStatus(Status.RESOLVED);
        return mapper.toEnvReportResponse(report);
    }
}
