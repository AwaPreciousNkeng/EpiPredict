package com.codewithpcodes.epipredict.alert;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByDistrictId(Long districtId);
    Optional<Alert> findTopByDistrictIdOrderByCreatedAtDesc(Long districtId);
}
