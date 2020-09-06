package com.example.ticket.repository;

import com.example.ticket.entity.AuctionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AuctionRecordRepository extends JpaRepository<AuctionRecord,Integer> {

    @Query(nativeQuery = true,value="select * from auc_record where record_price >=all (select record_price from auc_record)")
    AuctionRecord getHolderRecord(Integer id);

    @Query(nativeQuery = true,value="select * from auc_record where user_id=?1 and auction_id=?2")
    AuctionRecord findByUserIdAndAuctionId(Integer userid,Integer aucid);

    @Query(nativeQuery = true,value="select * from auc_record where auction_id=?1")
    List<AuctionRecord> findAllByAuctionId(Integer aucid);
}
