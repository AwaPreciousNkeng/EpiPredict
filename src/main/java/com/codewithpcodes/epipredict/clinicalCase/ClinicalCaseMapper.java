package com.codewithpcodes.epipredict.clinicalCase;

import org.springframework.stereotype.Service;

@Service
public class ClinicalCaseMapper {
    public ClinicalCaseResponse toClinicalCaseResponse(ClinicalCase clinicalCase) {
        return new ClinicalCaseResponse(
                clinicalCase.getId(),
                clinicalCase.getDiseaseType(),
                clinicalCase.getSeverity(),
                clinicalCase.getAdmissionTime(),
                clinicalCase.getHealthPersonnel().getUsername(),
                clinicalCase.getPatientAge(),
                clinicalCase.getPatientGender(),
                clinicalCase.getDescription(),
                clinicalCase.getHospital(),
                clinicalCase.getDistrict().getName()
        );
    }
}
