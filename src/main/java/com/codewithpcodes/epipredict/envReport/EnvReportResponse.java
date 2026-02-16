package com.codewithpcodes.epipredict.envReport;

import java.time.LocalDateTime;
import java.util.List;

public record EnvReportResponse(
        Long id,
        List<HazardType> hazardTypes,
        Double latitude,
        Double longitude,
        String description,
        Status status,
        String reporterName,
        String districtName,
        LocalDateTime reportTime
) {
}
