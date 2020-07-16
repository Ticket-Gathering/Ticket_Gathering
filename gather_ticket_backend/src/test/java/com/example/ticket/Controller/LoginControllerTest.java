package com.example.ticket.Controller;

import com.example.ticket.controller.LoginController;
import com.example.ticket.service.LoginService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockHttpServletRequestDsl;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LoginControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private LoginService loginService;

    @Autowired
    private LoginController loginController;

    @Test
    public void contextLoads(){
    }

    @Before
    public void setup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void login() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/login")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .param("username","sjw")
                                .param("password","123")
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
        System.out.println(responseString);
    }

}


