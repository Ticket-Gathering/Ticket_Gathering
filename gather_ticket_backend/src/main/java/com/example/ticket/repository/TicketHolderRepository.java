package com.example.ticket.repository;

import com.example.ticket.entity.TicketHolder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketHolderRepository extends JpaRepository<TicketHolder, Integer> {
}
