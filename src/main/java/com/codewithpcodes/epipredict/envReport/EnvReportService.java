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

    public EnvReportResponse createReport(EnvReportRequest request, Authentication currentUser) {
        User reporter = (User) currentUser.getPrincipal();
        if (reporter == null || reporter.getDistrict() == null) {
            throw new ResourceNotFoundException("Reporter not found or not assigned to a district.");
        }

        EnvReport report = EnvReport.builder()
                .reporter(reporter)
                .district(reporter.getDistrict())
                .hazardTypes(request.hazardTypes())
                .description(request.description())
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

    public List<EnvReportResponse> getMyReports(Authentication currentUser) {
        User reporter = (User) currentUser.getPrincipal();
        if (reporter == null) {
            throw new ResourceNotFoundException("Reporter not found.");
        }

        // Fetch user again to ensure envReports are loaded if lazy
        User user = userRepository.findById(reporter.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return user.getEnvReports()
                .stream()
                .map(mapper::toEnvReportResponse)
                .toList();
    }

    public EnvReportResponse resolveReport(Long reportId) {
        EnvReport report = repository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found."));

        report.setStatus(Status.RESOLVED);
        repository.save(report);
        return mapper.toEnvReportResponse(report);
    }
}
