package com.codewithpcodes.epipredict.weather;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeatherRepository extends JpaRepository<Weather, Long> {
    List<Weather> findByDistrictId(Long districtId);
}
