package com.codewithpcodes.epipredict.risk;

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
public class RiskSnapshot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double riskScore;
    private RiskLevel riskLevel;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;
    private LocalDateTime calculatedAt = LocalDateTime.now();
}
