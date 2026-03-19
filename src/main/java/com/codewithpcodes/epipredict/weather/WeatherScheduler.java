package com.codewithpcodes.epipredict.weather;

import com.codewithpcodes.epipredict.district.District;
import com.codewithpcodes.epipredict.district.DistrictRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class WeatherScheduler {
    private final DistrictRepository districtRepository;
    private final WeatherService weatherService;

    //Runs every 1 hour
    @Scheduled(fixedRate = 60000)
    public void fetchWeatherForAllDistricts() {
        log.info("Starting scheduled weather fetch for all districts...");
        List<District> districts = districtRepository.findAll();

        for (District district : districts) {
            try {
                weatherService.fetchAndSaveWeather(district.getId());
                log.info("Weather updated for {}", district.getName());
            } catch (Exception e) {
                log.error("Failed fetching weather for {}", district.getName(), e);
            }
        }
        log.info("Weather fetch completed.");
    }
}
