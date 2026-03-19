package com.codewithpcodes.epipredict.clinicalCase;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClinicalCaseControllerTest {

    @Mock
    ClinicalCaseService service;

    @InjectMocks
    ClinicalCaseController controller;

    @Test
    void logCase() {
        //Given
        ClinicalCaseRequest request = new ClinicalCaseRequest(
                DiseaseType.MALARIA,
                Severity.MODERATE,
                25,
                Gender.FEMALE,
                "Fever and headache",
                "Douala General Hospital",
                1L
        );
        Authentication authentication = mock(Authentication.class);
        LocalDateTime fixedTime = LocalDateTime.of(2026, 4, 3, 10, 0);

        ClinicalCaseResponse response = new ClinicalCaseResponse(
                1L,
                DiseaseType.MALARIA,
                Severity.MODERATE,
                fixedTime,
                "John Doe",
                25,
                Gender.FEMALE,
                "Fever and headache",
                "Douala General Hospital",
                "Wouri"
        );
        when(service.logCase(request, authentication)).thenReturn(response);

        //When
        ResponseEntity<ClinicalCaseResponse> result = controller.logCase(request, authentication);

        //Then
        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertEquals(response, result.getBody());
        verify(service).logCase(request, authentication);
    }

    @Test
    void getAllCases() {
        //Given
        LocalDateTime fixedTime = LocalDateTime.of(2026, 4, 3, 10, 0);
        List<ClinicalCaseResponse> responses = List.of(
                new ClinicalCaseResponse(
                        1L,
                        DiseaseType.MALARIA,
                        Severity.MODERATE,
                        fixedTime,
                        "John Doe",
                        25,
                        Gender.FEMALE,
                        "Fever and headache",
                        "Douala General Hospital",
                        "Wouri"
                )
        );
        when(service.getAllCases()).thenReturn(responses);

        //When
        ResponseEntity<List<ClinicalCaseResponse>> result = controller.getAllCases();

        //Then
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(responses, result.getBody());
        verify(service).getAllCases();
    }
}