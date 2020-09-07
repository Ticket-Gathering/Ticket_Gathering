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
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuctionControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private IndentService indentService;

    @Autowired
    private com.example.ticket.controller.IndentController IndentController;

    @Test
    public void contextLoads(){
    }

    @Before
    public void setup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void getAuction() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/auction/getAuction")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .param("id","1")
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
    }

    @Test
    public void updatePrice() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/auction/updatePrice")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .param("aucid","1")
                                .param("userid","1")
                                .param("record","5000")
                                .param("record_time","2020-09-7 13:00:00")
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
    }

    @Test
    public void getHolderRecord() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/auction/getHolderRecord")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .param("id","1")
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
    }

    @Test
    public void getRecordByUser() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/auction/getRecordByUser")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .param("userid","1")
                                .param("aucid","1")
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
    }

    @Test
    public void addNewRecord() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/auction/addNewRecord")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .param("userid","1")
                                .param("aucid","8")
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
    }

    @Test
    public void check() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/auction/check")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .param("aucid","1")
                                .param("userid","1")
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
    }

    @Test
    public void getAllAuction() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/auction/getAllAuction")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
    }

    @Test
    public void getMessageByUser() throws Exception{
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.post("http://localhost/auction/getMessageByUser")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                                .param("userid","1")
                )
                .andReturn().getResponse().getContentAsString();   //将相应的数据转换为字符串
    }
}
