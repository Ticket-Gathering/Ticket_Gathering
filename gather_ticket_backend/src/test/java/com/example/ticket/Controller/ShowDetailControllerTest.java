package com.example.ticket.Controller;

import com.example.ticket.service.ShowDetailService;
import com.example.ticket.service.ShowService;
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
public class ShowDetailControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ShowDetailService showDetailService;

    @Autowired
    private com.example.ticket.controller.ShowDetailController showDetailController;

    @Test
    public void contextLoads() {
    }

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void getDetail() throws  Exception{
        String responseString = mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/show/getDetail")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("id", "1_1_607447710935")
                        .param("platform", "大麦网")
        )
                .andReturn().getResponse().getContentAsString();
    }

}
