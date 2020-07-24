package com.example.ticket.serviceimpl;

import com.example.ticket.entity.Indent;
import com.example.ticket.service.IndentService;
import com.example.ticket.dao.IndentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class IndentServiceIMpl implements IndentService {
    @Autowired
    IndentDao indentDao;

    @Override
    public int addIndent(String username,String showid,Double facevalue,Integer num,Double payamount,String receiver_name,String receiver_tel,String receiver_address,String selected_time,String platform){
        return indentDao.addIndent(username,showid,facevalue,num,payamount,receiver_name,receiver_tel,receiver_address,selected_time,platform);
    }

    @Override
    public int updateIndent(Integer order_id,Integer status){
       return indentDao.updateIndent(order_id,status);
    }

    @Override
    public Indent getIndentByID(Integer order_id) {
        return indentDao.getIndentByID(order_id);
    }
}
