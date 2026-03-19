package com.codewithpcodes.epipredict.risk;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class RiskScheduler {

    private final RiskEngineService riskEngineService;

    @Scheduled(fixedRate = 300000) //every 5 minutes
    public void runRiskAnalysis() {
        log.info("Running the Risk Engine...");
        riskEngineService.calculateRiskForAllDistricts();
        log.info("Risk Analysis completed.");
    }
}
