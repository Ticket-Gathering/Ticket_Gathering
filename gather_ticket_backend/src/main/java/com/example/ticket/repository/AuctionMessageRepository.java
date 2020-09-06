package com.example.ticket.repository;

import com.example.ticket.entity.AuctionMessage;
import com.example.ticket.entity.AuctionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AuctionMessageRepository extends JpaRepository<AuctionMessage,Integer> {
    @Query(nativeQuery = true,value="select * from auc_message where user_id=?1")
    List<AuctionMessage> findAllByUserId(Integer userid);
}
