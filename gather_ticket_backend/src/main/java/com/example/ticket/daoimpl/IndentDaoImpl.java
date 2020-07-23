package com.example.ticket.daoimpl;

import com.example.ticket.dao.IndentDao;
import com.example.ticket.entity.Indent;
import com.example.ticket.repository.IndentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class IndentDaoImpl implements IndentDao {
    @Autowired
    IndentRepository indentRepository;

    @Override
    public int addIndent(String username,String showid,Double facevalue,Integer num,Double payamount,String receiver_name,String receiver_tel,String receiver_address){
        Indent  NI= new Indent();
        NI.setUsername(username);
        NI.setShowid(showid);
        NI.setFacevalue(facevalue);
        NI.setNum(num);
        NI.setPayamount(payamount);
        NI.setReceiver_name(receiver_name);
        NI.setReceiver_tel(receiver_tel);
        NI.setReceiver_address(receiver_address);
        NI.setOrder_status(1);
        indentRepository.save(NI);
        return NI.getOrderId();
    }

    @Override
    public  int updateIndent(Integer order_id,Integer status){
        Indent NI = indentRepository.getOne(order_id);
        NI.setOrder_status(status);
        indentRepository.save(NI);
        return 1;
    }

    @Override
    public Indent getIndentByID(Integer order_id) {
        return indentRepository.getOne(order_id);
    }
}
