package com.codewithpcodes.epipredict.envReport;

import com.codewithpcodes.epipredict.config.JwtService;
import com.codewithpcodes.epipredict.user.Role;
import com.codewithpcodes.epipredict.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class EnvReportSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EnvReportService service;

    @Test
    @WithMockUser(roles = "CHW")
    void resolveReport_shouldBeForbiddenForCHW() throws Exception {
        // Given
        Long reportId = 1L;
        EnvReportResponse response = new EnvReportResponse(
                1L, null, 0.0, 0.0, "test", Status.RESOLVED, "reporter", "district", LocalDateTime.now()
        );
        when(service.resolveReport(anyLong())).thenReturn(response);

        // When & Then
        mockMvc.perform(patch("/api/v1/env-reports/reports/{report-id}/resolve", reportId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }
}
