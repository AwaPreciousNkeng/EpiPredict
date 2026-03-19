package com.codewithpcodes.epipredict.clinicalCase;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/clinical-cases")
@RequiredArgsConstructor
@Tag(name = "Clinical Case")
public class ClinicalCaseController {
    private final ClinicalCaseService service;

    @PreAuthorize("hasRole('CLINICIAN')")
    @PostMapping
    public ResponseEntity<ClinicalCaseResponse> logCase(
            @Valid @RequestBody ClinicalCaseRequest request,
            Authentication currentUser
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.logCase(request, currentUser));
    }

    @PreAuthorize("hasRole('CLINICIAN')")
    @GetMapping("/my")
    public ResponseEntity<List<ClinicalCaseResponse>> getMyCases(Authentication currentUser) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getMyCases(currentUser));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<ClinicalCaseResponse>> getAllCases() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getAllCases());
    }
}
