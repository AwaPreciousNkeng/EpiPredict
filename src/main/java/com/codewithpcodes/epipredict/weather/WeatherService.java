package com.codewithpcodes.epipredict.weather;

import com.codewithpcodes.epipredict.district.District;
import com.codewithpcodes.epipredict.district.DistrictRepository;
import com.codewithpcodes.epipredict.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeatherService {
    private final WeatherRepository repository;
    private final DistrictRepository districtRepository;
    private final WeatherClient weatherClient;
    private final WeatherMapper mapper;

    @Value("${application.weather.api.key}")
    private String apiKey;

    public WeatherResponse fetchAndSaveWeather(Long districtId) {
        District district = districtRepository.findById(districtId)
                .orElseThrow(() -> new ResourceNotFoundException("District not found."));

        var response = weatherClient.getWeatherData(
                district.getCenterLat(),
                district.getCenterLong(),
                apiKey,
                "metric"
        );

        Weather log = Weather.builder()
                .district(district)
                .tempCelsius(response.getMain().getTemp())
                .humidityPercent(response.getMain().getHumidity())
                .rainfallMm(response.getRain() != null
                        ? response.getRain().getOneHour()
                        : 0.0
                )
                .build();
        repository.save(log);
        return mapper.toWeatherResponse(log);
    }

    public List<WeatherResponse> getWeatherHistory(Long districtId) {
        return repository.findByDistrictId(districtId)
                .stream()
                .map(mapper::toWeatherResponse)
                .toList();
    }
}
