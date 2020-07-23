package com.example.ticket.Controller;

import com.example.ticket.controller.IndentController;
import com.example.ticket.service.IndentService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest
public class IndentControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private IndentService indentService;

    @Autowired
    private IndentController IndentController;

    @Test
    public void contextLoads(){
    }

    @Before
    public void setup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void addIndent() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/addIndent")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .param("username","sjw")
                                .param("show_id","test")
                                .param("facevalue","10")
                                .param("num","1")
                                .param("payamount","10")
                                .param("receiver_name","test")
                                .param("receiver_tel","123")
                                .param("receiver_address","test")
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
    }

    @Test
    public void updateIndent() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/updateIndent")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .param("order_id","4")
                                .param("status","4")
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
    }
}
