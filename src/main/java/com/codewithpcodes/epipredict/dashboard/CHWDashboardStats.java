package com.codewithpcodes.epipredict.dashboard;

import com.codewithpcodes.epipredict.risk.RiskLevel;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CHWDashboardStats {
    private double currentTemp;
    private double currentHumidity;
    private RiskLevel currentRiskLevel;
    private String riskRecommendation;
    private long openReportsCount;
    private String districtName;
    private Long districtId;
}
