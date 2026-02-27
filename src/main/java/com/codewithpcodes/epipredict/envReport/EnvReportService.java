package com.codewithpcodes.epipredict.envReport;

import com.codewithpcodes.epipredict.district.District;
import com.codewithpcodes.epipredict.district.DistrictRepository;
import com.codewithpcodes.epipredict.exceptions.ResourceNotFoundException;
import com.codewithpcodes.epipredict.user.User;
import com.codewithpcodes.epipredict.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
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
        User reporter = (User) currentUser.getPrincipal();

        //A CHW can only report cases in their district
        if (reporter == null) {
            throw new ResourceNotFoundException("User not found.");
        }
        if (reporter.getDistrict() == null ||
                !reporter.getDistrict().getId().equals(request.districtId())) {
            throw new AccessDeniedException("You cannot report cases outside your assigned district.");
        }

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
