package com.example.ticket.controller;

import com.example.ticket.service.IndentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndentController {
    @Autowired
    private IndentService indentService;

    @RequestMapping("/addIndent")
    public int addIndent(@RequestParam("username") String username, @RequestParam("show_id") String show_id,@RequestParam("facevalue") Double facevalue,@RequestParam("num") Integer num,@RequestParam("payamount") Double payamount,@RequestParam("receiver_name") String receiver_name, @RequestParam("receiver_tel") String receiver_tel,@RequestParam("receiver_address") String receiver_address){
        return indentService.addIndent(username, show_id,facevalue,num,payamount,receiver_name,receiver_tel,receiver_address);
    }
}
