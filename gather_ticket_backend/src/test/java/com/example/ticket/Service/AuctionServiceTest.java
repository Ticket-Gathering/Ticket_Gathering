package com.example.ticket.Service;
import com.example.ticket.TicketApplication;
import com.example.ticket.entity.Auction;
import com.example.ticket.entity.AuctionMessage;
import com.example.ticket.entity.AuctionRecord;
import com.example.ticket.service.AuctionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = TicketApplication.class,webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuctionServiceTest {
    @Autowired
    private AuctionService auctionService;


    @Test
    public void contextLoads(){
    }

    @Test
    public void getAuction(){
        Auction test = auctionService.getAuction(5);
        assertEquals("1_1_620996253820",test.getShow_id());
        assertEquals(100,test.getStart_price());
        assertEquals(10.00,test.getStep_price());
        assertEquals(270,test.getHighest_Price());
        assertEquals("2020-09-01 12:00:00",test.getStart_time());
        assertEquals("2020-09-10 13:00:00",test.getEnd_time());
    }

    @Test
    public void getAllAuction(){
        List<Auction> test = auctionService.getAllAuction();
        assertEquals(10,test.size());
        assertEquals("1_1_592527005054",test.get(0).getShow_id());
        assertEquals("1_1_626331486335",test.get(9).getShow_id());
    }

    @Test
    public void updatePrice() throws ParseException {
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        int status = auctionService.updatePrice(1,1,1000.0,now).getStatus();
        assertEquals(-1,status);
//        int status2 = auctionService.updatePrice(1,2,6000.0,now).getStatus();
//        assertEquals(0,status2);
    }


    @Test
    public void getRecordByUser(){
        AuctionRecord test = auctionService.getRecordByUser(1,1);
        assertEquals(1000,test.getRecord_price());
    }

    @Test
    public void addNewRecord(){
        AuctionRecord test = auctionService.addNewRecord(1,9);
        //assertEquals(1,test.getUser_id());
    }

    @Test
    public void getMessageByUser(){
        List<AuctionMessage> test = auctionService.getMessageByUser(4);
        assertEquals(1,test.size());
    }

    @Test
    public void check(){
        int status = auctionService.check(1,1).getStatus();
        assertEquals(0,status);
    }
}

