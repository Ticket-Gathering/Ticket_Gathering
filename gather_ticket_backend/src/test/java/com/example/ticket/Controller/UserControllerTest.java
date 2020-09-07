package com.example.ticket.Controller;

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

import javax.transaction.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext context;

    @Test
    public void contextLoads(){
    }

    @Before
    public void setup(){
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }

    @Transactional
    @Test
    public void checkUser() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/checkUser")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("username","sjw")
                        .param("password","123")

        )
                .andReturn().getResponse().getContentAsString();
    }

    @Transactional
    @Test
    public void getUserById() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/getUserById")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("id","1")

        )
                .andReturn().getResponse().getContentAsString();
    }

    @Transactional
    @Test
    public void checkUserDuplicate() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/checkUserDuplicate")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("username","aaa")

        )
                .andReturn().getResponse().getContentAsString();
    }

    @Transactional
    @Test
    public void addUser() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/addUser")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("username","bbb")
                        .param("password","123")

        )
                .andReturn().getResponse().getContentAsString();
    }

    @Transactional
    @Test
    public void updateUserDetail() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/updateUserDetail")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)

        )
                .andReturn().getResponse().getContentAsString();
    }

    @Transactional
    @Test
    public void getAllUsers() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/getAllUsers")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)

        )
                .andReturn().getResponse().getContentAsString();
    }

    @Transactional
    @Test
    public void blockUser() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/blockUser")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("id","5")

        )
                .andReturn().getResponse().getContentAsString();
    }

    @Transactional
    @Test
    public void unblockUser() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/unblockUser")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("id","5")

        )
                .andReturn().getResponse().getContentAsString();
    }

//    @Transactional
//    @Test
//    public void deleteTicketHolder() throws Exception{
//        String responseString =mockMvc.perform(
//                MockMvcRequestBuilders.get("http://localhost/deleteTicketHolder")
//                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
//                        .param("ticketHolderId","8")
//
//        )
//                .andReturn().getResponse().getContentAsString();
//    }
//
//    @Transactional
//    @Test
//    public void deleteReceiver() throws Exception{
//        String responseString =mockMvc.perform(
//                MockMvcRequestBuilders.get("http://localhost/deleteReceiver")
//                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
//                        .param("receiverId","12")
//
//        )
//                .andReturn().getResponse().getContentAsString();
//    }

    @Transactional
    @Test
    public void updateTicketHolder() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/updateTicketHolder")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("userId","1")

        )
                .andReturn().getResponse().getContentAsString();
    }

    @Transactional
    @Test
    public void updateReceiver() throws Exception{
        String responseString =mockMvc.perform(
                MockMvcRequestBuilders.get("http://localhost/updateReceiver")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("userId","1")

        )
                .andReturn().getResponse().getContentAsString();
    }
}
