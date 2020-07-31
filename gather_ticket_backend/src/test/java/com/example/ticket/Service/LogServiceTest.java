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
public class LogServiceTest {
    @Test
    public void contextLoads(){
    }

}
