package com.example.ticket.repository;

import com.example.ticket.entity.OperationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationLogRepository extends JpaRepository<OperationLog, Integer> {
}
