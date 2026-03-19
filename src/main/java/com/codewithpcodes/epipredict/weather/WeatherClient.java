package com.codewithpcodes.epipredict.weather;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "weather-client", url = "${application.weather.api.url}")
public interface WeatherClient {

    @GetMapping
    WeatherApiResponse getWeatherData(
            @RequestParam("lat") double lat,
            @RequestParam("lon") double lon,
            @RequestParam("appid") String apiKey,
            @RequestParam("units") String units
    );
}
