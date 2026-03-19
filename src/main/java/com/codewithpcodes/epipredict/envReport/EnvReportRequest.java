package com.codewithpcodes.epipredict.envReport;

import java.util.List;

public record EnvReportRequest(
        List<HazardType> hazardTypes,
        String description
) {
}
