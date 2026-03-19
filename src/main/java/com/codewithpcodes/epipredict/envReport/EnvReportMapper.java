package com.codewithpcodes.epipredict.envReport;

import org.springframework.stereotype.Service;

@Service
public class EnvReportMapper {
    public EnvReportResponse toEnvReportResponse(EnvReport report) {
        return new EnvReportResponse(
                report.getId(),
                report.getHazardTypes(),
                report.getDescription(),
                report.getStatus(),
                report.getReporter().getFullName(),
                report.getDistrict().getName(),
                report.getReportTime()
        );
    }
}
