package com.codewithpcodes.epipredict.clinicalCase;

import com.codewithpcodes.epipredict.district.District;
import com.codewithpcodes.epipredict.district.DistrictRepository;
import com.codewithpcodes.epipredict.exceptions.ResourceNotFoundException;
import com.codewithpcodes.epipredict.user.User;
import com.codewithpcodes.epipredict.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClinicalCaseService {

    private final UserRepository userRepository;
    private final ClinicalCaseRepository repository;
    private final ClinicalCaseMapper mapper;
    private final DistrictRepository districtRepository;

    public ClinicalCaseResponse logCase(ClinicalCaseRequest request, Authentication currentUser) {
        User healthPersonnel = userRepository.findById(Long.parseLong(currentUser.getName()))
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

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
}
