package com.codewithpcodes.epipredict.envReport;

import org.jspecify.annotations.NonNull;
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
class EnvReportControllerTest {

    @Mock
    EnvReportService service;

    @InjectMocks
    EnvReportController controller;

    @Test
    void createReport() {
        //Given
        EnvReportRequest request = new EnvReportRequest(
                List.of(HazardType.STANDING_WATER),
                -1.2833,
                36.8167,
                "Heavy flooding in the area",
                1L
        );
        Authentication authentication = mock(Authentication.class);
        LocalDateTime fixedTime = LocalDateTime.of(2026, 4, 3, 10, 0);

        EnvReportResponse response = new EnvReportResponse(
                1L,
                List.of(HazardType.STANDING_WATER),
                -1.2833,
                36.8167,
                "Heavy flooding in the area",
                Status.OPEN,
                "John Doe",
                "Wouri",
                fixedTime
        );

        when(service.createReport(request, authentication)).thenReturn(response);

        //When
        ResponseEntity<EnvReportResponse> result = controller.createReport(request, authentication);

        //Then
        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertEquals(response, result.getBody());
        verify(service).createReport(request, authentication);
    }

    @Test
    void getAllReports() {
        //Given
        List<EnvReportResponse> reports = getEnvReportResponses();
        when(service.getAllReports()).thenReturn(reports);

        //When
        ResponseEntity<List<EnvReportResponse>> result = controller.getAllReports();

        //Then
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(reports, result.getBody());
        verify(service).getAllReports();
    }

    private static @NonNull List<EnvReportResponse> getEnvReportResponses() {
        LocalDateTime fixedTime = LocalDateTime.of(2026, 4, 3, 10, 0);
        return List.of(
                new EnvReportResponse(
                        1L,
                        List.of(HazardType.STANDING_WATER),
                        -1.2833,
                        36.8167,
                        "Heavy flooding",
                        Status.OPEN,
                        "John Doe",
                        "Wouri",
                        fixedTime
                )
        );
    }

    @Test
    void resolveReport() {
        //Given
        Long reportId = 1L;
        LocalDateTime fixedTime = LocalDateTime.of(2026, 4, 3, 10, 0);
        EnvReportResponse response = new EnvReportResponse(
                1L,
                List.of(HazardType.STANDING_WATER),
                -1.2833,
                36.8167,
                "Heavy flooding",
                Status.RESOLVED,
                "John Doe",
                "Wouri",
                fixedTime
        );
        when(service.resolveReport(reportId)).thenReturn(response);

        //When
        ResponseEntity<EnvReportResponse> result = controller.resolveReport(reportId);

        //Then
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(response, result.getBody());
        verify(service).resolveReport(reportId);
    }
}