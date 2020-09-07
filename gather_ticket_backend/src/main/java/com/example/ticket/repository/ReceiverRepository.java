package com.example.ticket.repository;

import com.example.ticket.entity.Receiver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiverRepository extends JpaRepository<Receiver,Integer> {
}
