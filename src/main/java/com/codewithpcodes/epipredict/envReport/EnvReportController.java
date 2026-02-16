package com.codewithpcodes.epipredict.envReport;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/env-reports")
@RequiredArgsConstructor
@PreAuthorize( "hasRole('CHW')")
public class EnvReportController {

    private final EnvReportService service;

    @PostMapping
    public ResponseEntity<EnvReportResponse> createReport(
            @RequestBody EnvReportRequest request,
            Authentication currentUser
    ) {
        return ResponseEntity.ok(service.createReport(request, currentUser));
    }

    @GetMapping
    public ResponseEntity<List<EnvReportResponse>> getAllReports() {
        return ResponseEntity.ok(service.getAllReports());
    }

    @PatchMapping("/{report-id}/resolve")
    public ResponseEntity<EnvReportResponse> resolveReport(@PathVariable("report-id") Long reportId) {
        return ResponseEntity.ok(service.resolveReport(reportId));
    }

}
