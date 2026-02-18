package com.codewithpcodes.epipredict.weather;

import java.time.LocalDateTime;

public record WeatherResponse(
        Long id,
        String districtName,
        Double tempCelsius,
        Double humidityPercent,
        Double rainfallMm,
        LocalDateTime logTime
) {
}
