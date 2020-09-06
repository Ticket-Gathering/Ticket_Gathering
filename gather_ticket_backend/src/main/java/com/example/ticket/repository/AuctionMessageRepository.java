package com.example.ticket.repository;

import com.example.ticket.entity.AuctionMessage;
import com.example.ticket.entity.AuctionRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionMessageRepository extends JpaRepository<AuctionMessage,Integer> {
}
