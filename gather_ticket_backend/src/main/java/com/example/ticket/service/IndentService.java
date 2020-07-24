package com.example.ticket.service;

import com.example.ticket.entity.Indent;

public interface IndentService {
    int addIndent(String username,String showid,Double facevalue,Integer num,Double payamount,String receiver_name,String receiver_tel,String receiver_address,String selected_time,String platform);
    int updateIndent(Integer order_id,Integer status);
    Indent getIndentByID(Integer order_id);
}
