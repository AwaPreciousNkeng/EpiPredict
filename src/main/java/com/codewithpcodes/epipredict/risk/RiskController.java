package com.codewithpcodes.epipredict.risk;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/risks")
@RequiredArgsConstructor
@Tag(name = "Risk Analysis")
public class RiskController {
    private final RiskEngineService service;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/run/{district-id}")
    public ResponseEntity<String> runRiskEngine(@PathVariable("district-id") Long districtId) {
        service.calculateRiskForDistrict(districtId);
        return ResponseEntity.ok("Risk Analysis completed.");
    }
}
