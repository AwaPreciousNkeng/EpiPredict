package com.codewithpcodes.epipredict.weather;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/weather")
@RequiredArgsConstructor
public class WeatherController {
    private final WeatherService service;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/fetch/{district-id}")
    public ResponseEntity<WeatherResponse> fetchWeather(@PathVariable("district-id") Long districtId) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.fetchAndSaveWeather(districtId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/history/{district-id}")
    public ResponseEntity<List<WeatherResponse>> getWeatherHistory(@PathVariable("district-id") Long districtId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(service.getWeatherHistory(districtId));
    }
}
