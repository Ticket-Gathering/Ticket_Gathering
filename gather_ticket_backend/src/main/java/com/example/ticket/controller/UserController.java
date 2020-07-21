package com.example.ticket.controller;

import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.service.UserService;
import com.example.ticket.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class
UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/checkUser")
    public ClientAuth checkUser(@RequestParam("username") String username, @RequestParam("password") String password){
        return userService.checkUser(username, password);
    }

    @RequestMapping("/getUserById/{id}")
    public Client getUserById(@PathVariable("id") int userId){
        return userService.getUserById(userId);
    }

    @RequestMapping("/checkUserDuplicate")
    public Msg checkUserDuplicate(@RequestParam("username") String username){
        return userService.checkUserDuplicate(username);
    }

    @RequestMapping("/addUser")
    public Msg addUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        return userService.addUser(username, password);
    }

    @RequestMapping("/getAllUsers")
    public List<ClientAuth> getAllUsers(){
        return userService.getAllUsers();
    }

    @RequestMapping("/blockUser/{id}")
    public Msg blockUser(@PathVariable("id") int userId){
        return userService.blockUser(userId);
    }

    @RequestMapping("/unblockUser/{id}")
    public Msg unblockUser(@PathVariable("id") int userId){
        return userService.unblockUser(userId);
    }
}
