package com.example.ticket.controller;

import com.example.ticket.entity.ClientAuth;
import com.example.ticket.entity.Indent;
import com.example.ticket.service.IndentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class IndentController {
    @Autowired
    private IndentService indentService;

    @RequestMapping("/addIndent")
    public int checkUser(@RequestParam("username") String username, @RequestParam("showid") String showid, ){
        return indentService.addIndent(username, showid,);
    }
}
