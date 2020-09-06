package com.example.ticket.service;

import com.example.ticket.entity.Auction;
import com.example.ticket.entity.AuctionMessage;
import com.example.ticket.entity.AuctionRecord;
import com.example.ticket.utils.msgutils.Msg;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

public interface AuctionService {
    Auction getAuction(Integer id);
    Msg updatePrice(Integer aucid, Integer userid, Double price, String record_time) throws ParseException;
    AuctionRecord getHolderRecord(Integer id);
    AuctionRecord getRecordByUser(Integer userid,Integer aucid);
    AuctionRecord addNewRecord(Integer userid,Integer aucid);
    Msg check(Integer aucid , Integer userid);
    List<Auction> getAllAuction();
    List<AuctionMessage> getMessageByUser(Integer userid);
}
