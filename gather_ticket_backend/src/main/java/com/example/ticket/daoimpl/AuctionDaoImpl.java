package com.example.ticket.daoimpl;

import com.example.ticket.dao.AuctionDao;
import com.example.ticket.dao.ShowDetailDao;
import com.example.ticket.entity.*;
import com.example.ticket.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

@Repository
public class AuctionDaoImpl implements AuctionDao {

    @Autowired
    AuctionRepository auctionRepository;

    @Autowired
    AuctionRecordRepository auctionRecordRepository;

    @Autowired
    AuctionMessageRepository auctionMessageRepository;

    @Autowired
    ShowDetailRepository showDetailRepository;

    @Autowired
    UserAuthRepository userAuthRepository;

    @Autowired
    ShowDetailDao showDetailDao;



    @Override
    public Auction getAuction(Integer id) {
        Optional<Auction> auction= auctionRepository.findById(id);
        if(auction.isPresent()){
            Auction auction1=auction.get();
            String showid =auction1.getShow_id();
            Integer user_id=auction1.getHighest_user_id();
            ShowDetail showDetailEntity =showDetailDao.getDetail(showid);
            auction1.setShowDetail(showDetailEntity);

            return auction1;
        }
        else {
            return null;
        }
    }

    @Override
    public Auction updatePrice(Integer aucid ,Integer userid, Double price) {
           Auction auction1=auctionRepository.findById(aucid).get();
           if(auction1==null)
               return null;
           Double nowprice =auction1.getHighest_Price();
           if(price>nowprice)
           {
               auction1.setHighest_price(price);
               auction1.setHighest_user_id(userid);
               auctionRepository.save(auction1);
               return auction1;
           }
           else
               return null;
    }
    @Override
    public AuctionRecord getHolderRecord(Integer id) {
        return auctionRecordRepository.getHolderRecord(id);
    }

    @Override
    public AuctionRecord getRecordByUserid(Integer userid, Integer aucid) {
        return auctionRecordRepository.findByUserIdAndAuctionId(userid,aucid);
    }

    @Override
    public AuctionRecord addNewRecord(Integer userid, Integer aucid) {
        AuctionRecord auctionRecord=auctionRecordRepository.findByUserIdAndAuctionId(userid,aucid);
        if(auctionRecord==null){
            AuctionRecord auctionRecord1=new AuctionRecord();
            auctionRecord1.setAuction_id(aucid);
            auctionRecord1.setUser_id(userid);
            auctionRecordRepository.save(auctionRecord1);
            return  auctionRecord1;
        }
        else
            return null;
    }

    @Override
    public AuctionRecord updatePrice(Integer aucid, Integer userid, Double price, String record_time) throws ParseException {
        AuctionRecord auctionRecord=auctionRecordRepository.findByUserIdAndAuctionId(userid,aucid);
        java.text.SimpleDateFormat formatter = new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss");
        formatter.setTimeZone(TimeZone.getTimeZone("GMT+8:00"));
        Date date =  formatter.parse(record_time);
        auctionRecord.setRecord_time(date);
        auctionRecord.setRecord_price(price);
        auctionRecord.setIf_check(1);
        auctionRecordRepository.save(auctionRecord);
        return auctionRecord;
    }

    @Override
    public void sendMessage(Integer aucid, Integer userid) {
        AuctionMessage auctionMessage=new AuctionMessage();
        auctionMessage.setUserId(userid);
        auctionMessage.setAuctionId(aucid);
        auctionMessage.setMessage("拍卖信息已更新，请查看！");
        auctionMessageRepository.save(auctionMessage);
    }

    @Override
    public List<AuctionRecord> findAllRecordByAuctionId(Integer aucid) {
        return auctionRecordRepository.findAllByAuctionId(aucid);
    }

    @Override
    public void setMessage_unChecked(Integer userid) {
        ClientAuth clientAuth=userAuthRepository.getOne(userid);
        clientAuth.setMessage_checked(0);
        userAuthRepository.save(clientAuth);
    }
}
