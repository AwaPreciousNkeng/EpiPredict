package com.codewithpcodes.epipredict.envReport;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface EnvReportRepository extends JpaRepository<EnvReport, Long> {
    @Query("""
SELECT COUNT(e)
FROM EnvReport e
WHERE  e.district.id = :districtId
AND e.status = :status
""")
    Long countByDistrictIdAndStatus(Long districtId, Status status);
    List<EnvReport> findByReporterId(Long reportId);

}
