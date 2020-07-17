package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.constant.Constant;
import com.example.ticket.utils.msgutils.Msg;
import com.example.ticket.service.LoginService;
import net.sf.json.JSONObject;
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
    public void username_failure(){
        String username = "sss";
        String password = "123";
        JSONObject obj = null;

        Msg test = (loginService.login(username,password));
        int status = test.getStatus();
        String msg = test.getMsg();
        JSONObject data = test.getData();

        assertEquals(-100,status);
        assertEquals("用户名或密码错误，请重新输入！",msg);
        assertEquals(obj,data);
    }
}
