package com.codewithpcodes.epipredict.weather;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WeatherControllerTest {

    @Mock
    WeatherService service;

    @InjectMocks
    WeatherController controller;

    static LocalDateTime fixedTime = LocalDateTime.of(2021, 1, 1, 0, 0);
    @Test
    void fetchWeather() {
        //Given
        Long districtId = 1L;

        WeatherResponse response = new WeatherResponse(
                1L,
                "Wouri",
                25.0,
                60.0,
                0.0,
                fixedTime
        );

        when(service.fetchAndSaveWeather(districtId)).thenReturn(response);

        //When
        ResponseEntity<WeatherResponse> result = controller.fetchWeather(districtId);

        //Then
        assertNotNull(result.getBody());
        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertEquals(response, result.getBody());
        verify(service).fetchAndSaveWeather(districtId);
    }

    @Test
    void getWeatherHistory() {
        //Given
        Long districtId = 1L;
        List<WeatherResponse> history = List.of(
                new WeatherResponse(
                        1L,
                        "Wouri",
                        25.0,
                        60.0,
                        0.0,
                        fixedTime
                )
        );

        when(service.getWeatherHistory(districtId)).thenReturn(history);

        //When
        ResponseEntity<List<WeatherResponse>> result = controller.getWeatherHistory(districtId);

        //Then
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(history, result.getBody());
        verify(service).getWeatherHistory(districtId);
    }
}