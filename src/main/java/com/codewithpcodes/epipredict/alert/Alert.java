package com.codewithpcodes.epipredict.alert;

import com.codewithpcodes.epipredict.district.District;
import com.codewithpcodes.epipredict.risk.RiskLevel;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double riskScore;
    private RiskLevel alertLevel;
    private String recommendation;
    private boolean isAcknowledged;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @CreatedDate
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
