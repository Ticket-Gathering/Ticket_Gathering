package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.constant.Constant;
import com.example.ticket.utils.msgutils.Msg;
import com.example.ticket.service.LoginService;
import com.example.ticket.utils.msgutils.Msg;
import net.sf.json.JSONObject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = TicketApplication.class)
public class LoginServiceTest {
    @Test
    public void contextLoads(){
    }

    @Autowired
    private LoginService loginService;

    @Autowired
    @Lazy
    PasswordEncoder passwordEncoder;

    @Test
    public void login_successfully(){
        String username = "sjw";
        String password = "123";
        int status = (loginService.login(username,passwordEncoder.encode(password))).getStatus();
//        assertEquals(0,status);
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
