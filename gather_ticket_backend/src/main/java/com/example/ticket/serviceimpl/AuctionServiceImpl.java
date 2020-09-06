package com.example.ticket.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.example.ticket.config.WebSocket;
import com.example.ticket.dao.AuctionDao;
import com.example.ticket.entity.Auction;
import com.example.ticket.entity.AuctionMessage;
import com.example.ticket.entity.AuctionRecord;
import com.example.ticket.service.AuctionService;
import com.example.ticket.utils.msgutils.Msg;
import com.example.ticket.utils.msgutils.MsgCode;
import com.example.ticket.utils.msgutils.MsgUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    public AuctionDao auctionDao;


    @Autowired
    public WebSocket webSocket;

    @Override
    public Auction getAuction(Integer id) {
        return auctionDao.getAuction(id);
    }

    @Override
    public Msg updatePrice(Integer aucid , Integer userid, Double price, String record_time) throws ParseException {
        Auction auction1=auctionDao.updatePrice(aucid,userid,price);
        AuctionRecord auctionrecord=auctionDao.updatePrice(aucid,userid,price,record_time);
        if(auction1 != null){
            Double highestprice=auction1.getHighest_Price();
            Integer highestuserid=auction1.getHighest_user_id();
            JSONObject object=new JSONObject();
            object.put("highest_price",highestprice);
            object.put("highest_userid",highestuserid);
            String objStr= JSON.toJSONString(object);
            webSocket.sendMessage(objStr);

            List<AuctionRecord> userlist= auctionDao.findAllRecordByAuctionId(aucid);
            for(AuctionRecord auc:userlist){
                Integer user_id=auc.getUser_id();
                if(user_id!=userid)
                {
                    System.out.println(aucid);
                    System.out.println(user_id);
                    auctionDao.sendMessage(aucid,user_id);
                    auctionDao.setMessageUnchecked(user_id);
                }
            }

            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);
        }
    }

    @Override
    public AuctionRecord getHolderRecord(Integer id) {
        return auctionDao.getHolderRecord(id);
    }

    @Override
    public AuctionRecord getRecordByUser(Integer userid, Integer aucid) {
        return auctionDao.getRecordByUserid(userid,aucid);
    }

    @Override
    public AuctionRecord addNewRecord(Integer userid, Integer aucid) {
        return auctionDao.addNewRecord(userid,aucid);
    }

    @Override
    public Msg check(Integer aucid, Integer userid) {
        AuctionRecord auctionRecord= auctionDao.getRecordByUserid(userid,aucid);
        if(auctionRecord!=null)
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
        else
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);
    }

    @Override
    public List<Auction> getAllAuction() {
        return auctionDao.getAllAuction();
    }

    @Override
    public List<AuctionMessage> getMessageByUser(Integer userid) {
        return auctionDao.getMessageByUser(userid);
    }

}
