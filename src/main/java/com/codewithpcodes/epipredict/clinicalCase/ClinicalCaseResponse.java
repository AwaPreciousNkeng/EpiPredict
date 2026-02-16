package com.codewithpcodes.epipredict.clinicalCase;

import java.time.LocalDateTime;

public record ClinicalCaseResponse(

        Long id,
        DiseaseType diseaseType,
        Severity severity,
        LocalDateTime admissionTime,
        String clinicianName,
        String hospital,
        String districtName
) {
}
