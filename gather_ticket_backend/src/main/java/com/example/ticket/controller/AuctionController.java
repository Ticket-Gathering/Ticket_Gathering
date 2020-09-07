package com.example.ticket.controller;

import com.example.ticket.entity.Auction;
import com.example.ticket.entity.AuctionMessage;
import com.example.ticket.entity.AuctionRecord;
import com.example.ticket.service.AuctionService;
import com.example.ticket.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
public class AuctionController {
    @Autowired
    AuctionService auctionService;

    @RequestMapping("/auction/getAuction")
    public Auction getAuction(@RequestParam("id") Integer id){
        System.out.println(auctionService.getAuction(id));
        System.out.println(auctionService.getAuction(id).getEnd_time());
        return auctionService.getAuction(id);
    }

    @RequestMapping("/auction/updatePrice")
    public Msg updatePrice(@RequestParam("aucid") Integer aucid , @RequestParam("userid") Integer userid, @RequestParam("price") Double price, @RequestParam("record_time") String record_time) throws ParseException {
        return auctionService.updatePrice(aucid,userid,price,record_time);
    }

    @RequestMapping("/auction/getHolderRecord")
    public AuctionRecord getHolderRecord(@RequestParam("id") Integer id){
        return auctionService.getHolderRecord(id);
    }

    @RequestMapping("/auction/getRecordByUser")
    public AuctionRecord getRecordByUser(@RequestParam("userid") Integer userid, @RequestParam("aucid") Integer aucid){
        return auctionService.getRecordByUser(userid,aucid);
    }

    @RequestMapping("/auction/addNewRecord")
    public AuctionRecord addNewRecord(@RequestParam("userid") Integer userid, @RequestParam("aucid") Integer aucid){
        return auctionService.addNewRecord(userid,aucid);
    }

    @RequestMapping("/auction/check")
    public Msg check(@RequestParam("aucid") Integer aucid , @RequestParam("userid") Integer userid){
        return auctionService.check(aucid,userid);
    }

    @RequestMapping("/auction/getAllAuction")
    public List<Auction>  getAllAuction(){
        return auctionService.getAllAuction();
    }

    @RequestMapping("/auction/setMessageChecked/{id}")
    public void setMessageChecked(@PathVariable("id") Integer userid) {
        auctionService.setMessageChecked(userid);
    }

    @RequestMapping("/auction/getMessageByUser")
    public List<AuctionMessage> getMessageByUser( @RequestParam("userid") Integer userid){
        return auctionService.getMessageByUser(userid);
    }
}
