package com.codewithpcodes.epipredict.clinicalCase;

public record ClinicalCaseRequest(
        DiseaseType diseaseType,
        Severity severity,
        Integer age,
        Gender patientGender,
        String description,
        String hospital,
        Long districtId
) {
}
