package com.codewithpcodes.epipredict.weather;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/weather")
@RequiredArgsConstructor
public class WeatherController {
    private final WeatherService service;

    @PostMapping("/fetch/{district-id}")
    public ResponseEntity<WeatherResponse> fetchWeather(@PathVariable("district-id") Long districtId) {
        return ResponseEntity.ok(service.fetchAndSaveWeather(districtId));
    }

    @GetMapping("/history/{district-id}")
    public ResponseEntity<List<WeatherResponse>> getWeatherHistory(@PathVariable("district-id") Long districtId) {
        return ResponseEntity.ok(service.getWeatherHistory(districtId));
    }
}
