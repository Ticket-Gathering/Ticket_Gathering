package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.service.LoginService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = TicketApplication.class)
public class LoginServiceTest {
    @Test
    public void contextLoads(){
    }

    @Autowired
    private LoginService loginService;

    @Test
    public void login_successfully(){
        String username = "sjw";
        String password = "123";
        int status = (loginService.login(username,password)).getStatus();
        System.out.println(status);
//        int status = test.getStatus();
        assertEquals(0,status);
    }

    @Test
    public void login_failure(){

    }
}
