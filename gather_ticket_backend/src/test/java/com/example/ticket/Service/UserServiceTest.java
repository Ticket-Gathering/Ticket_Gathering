package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.entity.Client;
import com.example.ticket.service.UserService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = TicketApplication.class)
public class UserServiceTest {
    @Test
    public void contextLoads(){
    }

    @Autowired
    private UserService userService;

    @Test
    public void checkUser(){
        String username1 = "sjw";
        String password1 = "123";
        String username2 = "sjw";
        String password2 = "1234";
        String username3 = "sss";
        String password3 = "123";

        ClientAuth test1 = userService.checkUser(username1,password1);
        ClientAuth test2 = userService.checkUser(username2,password2);
        ClientAuth test3 = userService.checkUser(username3,password3);

        ClientAuth expect1 = new ClientAuth();
        expect1.setUserId(1);
        expect1.setUsername(username1);
        expect1.setPassword(password1);

        assertEquals(expect1.getUserId(),test1.getUserId());
        assertEquals(expect1.getUsername(),test1.getUsername());
        assertEquals(expect1.getPassword(),test1.getPassword());
        assertEquals(null,test2);
        assertEquals(null,test3);
    }

    @Test
    public void getUserById(){
        Integer userId1 = 1;
        Integer userId2 = 10;

        Client test1 = userService.getUserById(userId1);
        Client test2 = userService.getUserById(userId2);


    }
}
