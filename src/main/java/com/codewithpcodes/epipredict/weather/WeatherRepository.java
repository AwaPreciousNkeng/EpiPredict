package com.codewithpcodes.epipredict.weather;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WeatherRepository extends JpaRepository<Weather, Long> {
    List<Weather> findByDistrictId(Long districtId);

    @Query("""
SELECT w
FROM Weather w
WHERE w.district.id = :districtId
ORDER BY w.logTime DESC
""")
    Weather findTopByDistrictIdOrderByLogTimeDesc(Long districtId);
}
