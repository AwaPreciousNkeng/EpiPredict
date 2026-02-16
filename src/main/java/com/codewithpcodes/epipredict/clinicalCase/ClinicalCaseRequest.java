package com.codewithpcodes.epipredict.clinicalCase;

public record ClinicalCaseRequest(
        DiseaseType diseaseType,
        Severity severity,
        String hospital,
        Long districtId
) {
}
