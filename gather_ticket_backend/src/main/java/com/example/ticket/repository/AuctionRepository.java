package com.example.ticket.repository;

import com.example.ticket.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction,Integer> {
}
