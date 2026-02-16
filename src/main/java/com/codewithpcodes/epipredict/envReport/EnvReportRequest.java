package com.codewithpcodes.epipredict.envReport;

import java.util.List;

public record EnvReportRequest(
        List<HazardType> hazardTypes,
        Double latitude,
        Double longitude,
        String description,
        Long districtId

) {
}
