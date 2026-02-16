package com.codewithpcodes.epipredict.district;

import com.codewithpcodes.epipredict.alert.Alert;
import com.codewithpcodes.epipredict.clinicalCase.ClinicalCase;
import com.codewithpcodes.epipredict.envReport.EnvReport;
import com.codewithpcodes.epipredict.risk.RiskSnapshot;
import com.codewithpcodes.epipredict.user.User;
import com.codewithpcodes.epipredict.weatherLog.WeatherLog;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "districts")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String region;
    private double centerLat;
    private double centerLong;
    private Long population;
    private double area;

    @OneToMany(mappedBy = "district")
    private List<User> users;

    @OneToMany(mappedBy = "district")
    private List<EnvReport> envReports;

    @OneToMany(mappedBy = "district")
    private List<ClinicalCase> clinicalCases;

    @OneToMany(mappedBy = "district")
    private List<WeatherLog> weatherLogs;

    @OneToMany(mappedBy = "district")
    private List<RiskSnapshot> riskSnapshots;

    @OneToMany(mappedBy = "district")
    private List<Alert> alerts;

    public double getPopulationDensity() {
        return population / area;
    }
}
