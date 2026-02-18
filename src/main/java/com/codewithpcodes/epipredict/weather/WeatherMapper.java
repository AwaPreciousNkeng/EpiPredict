package com.codewithpcodes.epipredict.weather;

import org.springframework.stereotype.Service;

@Service
public class WeatherMapper {
    public WeatherResponse toWeatherResponse(Weather weather) {
        return new WeatherResponse(
                weather.getId(),
                weather.getDistrict().getName(),
                weather.getTempCelsius(),
                weather.getHumidityPercent(),
                weather.getRainfallMm(),
                weather.getLogTime()
        );
    }
}
