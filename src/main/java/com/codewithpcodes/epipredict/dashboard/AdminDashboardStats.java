package com.codewithpcodes.epipredict.dashboard;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardStats {
    private long totalDistricts;
    private long totalAgents; // CHWs
    private long totalClinicalCases;
    private long totalEnvReports;
    private double averageRiskScore;
    private long pendingAlerts;
}
