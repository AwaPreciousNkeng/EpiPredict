package com.codewithpcodes.epipredict.clinicalCase;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/clinical-cases")
@RequiredArgsConstructor
@PreAuthorize("hasRole('CLINICIAN')")
public class ClinicalCaseController {
    private final ClinicalCaseService service;
}
