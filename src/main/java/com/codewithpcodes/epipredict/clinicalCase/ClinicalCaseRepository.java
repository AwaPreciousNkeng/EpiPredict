package com.codewithpcodes.epipredict.clinicalCase;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClinicalCaseRepository extends JpaRepository<ClinicalCase, Long> {

    @Query("""
SELECT COUNT(c)
FROM ClinicalCase c
WHERE c.district.id = :districtId
""")
    Long countByDistrictId(Long districtId);
}
