package com.example.ticket.controller;

import com.example.ticket.constant.Constant;
import com.example.ticket.service.LoginService;
import com.example.ticket.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class LoginController {
    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public Msg login(@RequestBody Map<String, String> params){
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        return loginService.login(username,password);
    }
}
