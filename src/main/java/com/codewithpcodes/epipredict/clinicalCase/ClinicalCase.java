package com.codewithpcodes.epipredict.clinicalCase;

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
public class ClinicalCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private DiseaseType diseaseType;
    private Severity severity;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;
    private LocalDateTime admissionTime;
}
