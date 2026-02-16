package com.codewithpcodes.epipredict.weatherLog;

import com.codewithpcodes.epipredict.district.District;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class WeatherLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double temperatureCelsius;
    private double humidityPercent;
    private double rainfallMm;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;
    private LocalDateTime logTime = LocalDateTime.now();
}
