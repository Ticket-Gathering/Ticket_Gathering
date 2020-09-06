package com.example.ticket.Controller;

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
@SpringBootTest
public class ShowControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ShowService showService;

    @Autowired
    private com.example.ticket.controller.ShowController showController;

    @Test
    public void contextLoads() {
    }

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Test
    public void getAllCityWithShowNow() throws Exception {
        String responseString = mockMvc.perform
                (
                        MockMvcRequestBuilders.get("http://localhost/show/getAllCityWithShowNow")
                                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                )
                .andReturn().getResponse().getContentAsString();
    }

    @Test
    public void getHomepage() throws Exception {
        String responseString = mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/show/getHomePage")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
        )
                .andReturn().getResponse().getContentAsString();

    }

    @Test
    public void searchShow() throws Exception {
        String responseString = mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/show/serchShows")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("keyword", "上海")
                        .param("category", "1")
                        .param("city", "上海")
                        .param("sub_category", "9")
                        .param("pagesize", "1")
                        .param("currentsize", "30")
        )
                .andReturn().getResponse().getContentAsString();
    }

    @Test
    public void recommendByCategory() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/show/recommendByCategory")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .param("subCategory","9")

        )
        .andReturn().getResponse().getContentAsString();
    }

    @Test
    public void recommendByKeyword() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/show/recommendByKeyword")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("keyword","%音乐%")

        )
                .andReturn().getResponse().getContentAsString();
    }

    @Test
    public void getPlatformList() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/show/getPlatformList")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("id","1_1_586941895305")

        )
                .andReturn().getResponse().getContentAsString();
    }
}