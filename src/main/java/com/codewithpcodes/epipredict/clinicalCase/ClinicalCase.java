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

    @Enumerated(EnumType.STRING)
    private DiseaseType diseaseType;

    @Enumerated(EnumType.STRING)
    private Severity severity;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User healthPersonnel;

    private Integer patientAge;

    @Enumerated(EnumType.STRING)
    private Gender patientGender;
    private String description;
    private String hospital;

    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;

    @Column(name = "admission_time", nullable = false, updatable = false)
    private LocalDateTime admissionTime;
}
