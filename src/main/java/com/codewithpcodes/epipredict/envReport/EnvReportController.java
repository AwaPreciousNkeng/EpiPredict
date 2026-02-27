package com.codewithpcodes.epipredict.envReport;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/env-reports")
@RequiredArgsConstructor
@Tag(name = "Environmental Report")
public class EnvReportController {

    private final EnvReportService service;

    @PreAuthorize("hasRole('CHW')")
    @PostMapping
    public ResponseEntity<EnvReportResponse> createReport(
            @Valid @RequestBody EnvReportRequest request,
            Authentication currentUser
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.createReport(request, currentUser));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<EnvReportResponse>> getAllReports() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getAllReports());
    }


    @PatchMapping("/reports/{report-id}/resolve")
    public ResponseEntity<EnvReportResponse> resolveReport(@PathVariable("report-id") Long reportId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.resolveReport(reportId));
    }

}
