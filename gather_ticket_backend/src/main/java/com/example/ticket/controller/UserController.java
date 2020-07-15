package com.example.ticket.controller;

import com.example.ticket.entity.Clients_auth;
import com.example.ticket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/checkUser")
    public Clients_auth checkUser(@RequestParam("username") String username, @RequestParam("password") String password){
        return userService.checkUser(username, password);
    }

    @RequestMapping("/getUserById")
    public clients getUserById(@RequestParam("userId") int userId){
        return userService.getUserById(userId);
    }
}
