package com.example.ticket.controller;

import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.entity.Receiver;
import com.example.ticket.entity.TicketHolder;
import com.example.ticket.service.UserService;
import com.example.ticket.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping("/updateUserDetail")
    public Msg updateUserDetail(@RequestBody Client client)
//    @RequestParam("userID")int userId,@RequestParam("birth") Date birth,
//                                @RequestParam("nickname") String nickname,@RequestParam("name") String name,
//                                @RequestParam("email") String email,@RequestParam("tele") String tele,
//                                @RequestParam("ID") String IDNum,@RequestParam("gender") int gender)
                                {
                                    System.out.println("success!");
        return userService.updateUserDetail(client);
    }
    @RequestMapping("/admin/getAllUsers")
    public List<ClientAuth> getAllUsers(){
        return userService.getAllUsers();
    }

    @RequestMapping("/admin/blockUser/{id}")
    public Msg blockUser(@PathVariable("id") int userId){
        return userService.blockUser(userId);
    }

    @RequestMapping("/admin/unblockUser/{id}")
    public Msg unblockUser(@PathVariable("id") int userId){
        return userService.unblockUser(userId);
    }

    @RequestMapping("deleteTicketHolder")
    public Msg deleteTicketHolder(@RequestParam("ticketHolderId")int ticketHolderId){
        return userService.deleteTicketHolder(ticketHolderId);
    }

    @RequestMapping("deleteReceiver")
    public Msg deleteReceiver(@RequestParam("receiverId")int receiverId){
        return userService.deleteReceiver(receiverId);
    }

    @RequestMapping("/updateTicketHolder")
    public Msg updateTicketHolder(@RequestBody TicketHolder ticketHolder,@RequestParam("userId")int userId){
        return userService.updateTicketHolder(ticketHolder,userId);
    }

    @RequestMapping("/updateReceiver")
    public Msg updateReceiver(@RequestBody Receiver receiver,@RequestParam("userId")int userId){
        return userService.updateReceiver(receiver,userId);
    }
}
