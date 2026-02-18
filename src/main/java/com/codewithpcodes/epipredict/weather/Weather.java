package com.codewithpcodes.epipredict.weather;

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
public class Weather {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double tempCelsius;
    private Double humidityPercent;
    private Double rainfallMm;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @Column(name = "log_time", nullable = false, updatable = false)
    private LocalDateTime logTime;
}
