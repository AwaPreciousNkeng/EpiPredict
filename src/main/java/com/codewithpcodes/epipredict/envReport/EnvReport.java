package com.codewithpcodes.epipredict.envReport;

import com.codewithpcodes.epipredict.district.District;
import com.codewithpcodes.epipredict.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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
    private List<HazardType> hazardTypes;
    private Double latitude;
    private Double longitude;
    private String description;
    private Status status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User reporter;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @Column(name = "report_time", nullable = false, updatable = false)
    private LocalDateTime reportTime;
}
