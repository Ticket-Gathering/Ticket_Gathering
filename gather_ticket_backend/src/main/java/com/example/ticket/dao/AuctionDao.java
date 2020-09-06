package com.example.ticket.dao;

import com.example.ticket.entity.Auction;
import com.example.ticket.entity.AuctionRecord;
import com.example.ticket.utils.msgutils.Msg;

import java.text.ParseException;
import java.util.List;

public interface AuctionDao {
    Auction getAuction(Integer id);
    Auction updatePrice(Integer aucid ,Integer userid, Double price);
    AuctionRecord getHolderRecord(Integer id);
    AuctionRecord getRecordByUserid(Integer userid,Integer aucid);
    AuctionRecord addNewRecord(Integer userid,Integer aucid);
    AuctionRecord updatePrice(Integer aucid, Integer userid, Double price, String record_time) throws ParseException;
    void sendMessage(Integer aucid,Integer userid);
    List<AuctionRecord> findAllRecordByAuctionId(Integer aucid);
    void setMessageUnchecked(Integer userid);
    List<Auction> getAllAuction();
}
