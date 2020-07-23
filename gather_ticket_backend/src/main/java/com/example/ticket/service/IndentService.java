package com.example.ticket.service;

public interface IndentService {
    int addIndent(String username,String showid,Double facevalue,Integer num,Double payamount,String receiver_name,String receiver_tel,String receiver_address);
    int updateIndent(Integer order_id,Integer status);
}
