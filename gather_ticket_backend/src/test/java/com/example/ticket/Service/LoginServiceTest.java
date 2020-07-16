package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.constant.Constant;
import com.example.ticket.service.LoginService;
import com.example.ticket.utils.msgutils.Msg;
import com.example.ticket.utils.msgutils.MsgCode;
import com.example.ticket.utils.msgutils.MsgUtil;
import com.example.ticket.utils.sessionutils.SessionUtil;
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
        JSONObject obj = new JSONObject();
        obj.put("userId", 1);
        obj.put("username","sjw");

        Msg test = (loginService.login(username,password));
        int status = test.getStatus();
        String msg = test.getMsg();
        JSONObject data = test.getData();

        assertEquals(0,status);
        assertEquals("登录成功！",msg);
        assertEquals(obj,data);
    }

    @Test
    public void password_failure(){
        String username = "sjw";
        String password = "1234";
        JSONObject obj = null;

        Msg test = (loginService.login(username,password));
        int status = test.getStatus();
        String msg = test.getMsg();
        JSONObject data = test.getData();

        assertEquals(-100,status);
        assertEquals("用户名或密码错误，请重新输入！",msg);
        assertEquals(obj,data);
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
