package com.codewithpcodes.epipredict.envReport;

import com.codewithpcodes.epipredict.district.District;
import com.codewithpcodes.epipredict.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "env_reports")
public class EnvReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private HazardType hazardType;
    private double latitude;
    private double longitude;
    private String description;
    private Status status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;
    private LocalDateTime reportTime = LocalDateTime.now();
}
