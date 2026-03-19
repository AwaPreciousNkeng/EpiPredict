package com.codewithpcodes.epipredict.clinicalCase;

import com.codewithpcodes.epipredict.district.District;
import com.codewithpcodes.epipredict.district.DistrictRepository;
import com.codewithpcodes.epipredict.exceptions.ResourceNotFoundException;
import com.codewithpcodes.epipredict.user.User;
import com.codewithpcodes.epipredict.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClinicalCaseService {

    private final UserRepository userRepository;
    private final ClinicalCaseRepository repository;
    private final ClinicalCaseMapper mapper;
    private final DistrictRepository districtRepository;

    public ClinicalCaseResponse logCase(ClinicalCaseRequest request, Authentication currentUser) {
        User healthPersonnel = (User) currentUser.getPrincipal();

        if (healthPersonnel == null) {
            throw new ResourceNotFoundException("Health personnel not found.");
        }
        if (healthPersonnel.getDistrict() == null ||
                !healthPersonnel.getDistrict().getId().equals(request.districtId())
        ) {
            throw new AccessDeniedException("You cannot log cases outside your assigned district.");
        }
        District district = districtRepository.findById(request.districtId())
                .orElseThrow(() -> new ResourceNotFoundException("District not found."));

        ClinicalCase clinicalCase = ClinicalCase.builder()
                .diseaseType(request.diseaseType())
                .severity(request.severity())
                .healthPersonnel(healthPersonnel)
                .patientAge(request.age())
                .patientGender(request.patientGender())
                .description(request.description())
                .hospital(request.hospital())
                .district(district)
                .admissionTime(LocalDateTime.now())
                .build();
        repository.save(clinicalCase);
        return mapper.toClinicalCaseResponse(clinicalCase);
    }

    public List<ClinicalCaseResponse> getAllCases() {
        return repository
                .findAll()
                .stream()
                .map(mapper::toClinicalCaseResponse)
                .toList();
    }

    public List<ClinicalCaseResponse> getMyCases(Authentication currentUser) {
        User healthPersonnel = (User) currentUser.getPrincipal();
        return healthPersonnel.getClinicalCases()
                .stream()
                .map(mapper::toClinicalCaseResponse)
                .toList();
    }
}
