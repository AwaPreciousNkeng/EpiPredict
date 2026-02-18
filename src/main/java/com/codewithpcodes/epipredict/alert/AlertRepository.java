package com.codewithpcodes.epipredict.alert;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByDistrictId(Long districtId);
}
