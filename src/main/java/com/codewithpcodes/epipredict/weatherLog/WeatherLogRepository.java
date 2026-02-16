package com.codewithpcodes.epipredict.weatherLog;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherLogRepository extends JpaRepository<WeatherLog, Long> {
}
