package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.entity.Client;
import com.example.ticket.entity.Receiver;
import com.example.ticket.entity.TicketHolder;
import com.example.ticket.repository.UserAuthRepository;
import com.example.ticket.service.UserService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;
import java.util.List;

@SpringBootTest(classes = TicketApplication.class,webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserServiceTest {
    @Test
    public void contextLoads(){
    }

    @Autowired
    private UserService userService;

    @Autowired
    private UserAuthRepository userauthRepository;

    @Test
    public void checkUser(){
        String username1 = "sjw";
        String password1 = "123";
        String username2 = "sjw";
        String password2 = "1234";
        String username3 = "sss";
        String password3 = "123";

        ClientAuth test1 = userService.checkUser(username1,password1);
        ClientAuth test2 = userService.checkUser(username2,password2);
        ClientAuth test3 = userService.checkUser(username3,password3);

        ClientAuth expect1 = new ClientAuth();
        expect1.setUserId(1);
        expect1.setUsername(username1);
        expect1.setPassword(password1);

//        assertEquals(expect1.getUserId(),test1.getUserId());
//        assertEquals(expect1.getUsername(),test1.getUsername());
//        assertEquals(expect1.getPassword(),test1.getPassword());
////        assertNull(test2);
////        assertNull(test3);
    }

    @Transactional
    @Test
    public void getUserById(){
        Client test  = userService.getUserById(1);
        assertEquals("sjw",test.getName());
        assertEquals("weiwei",test.getNickname());
        assertEquals(1,test.getGender());
        assertEquals(null,test.getEmail());
        assertEquals(null,test.getBirth());
        assertEquals(null,test.getTel());
    }

    @Transactional
    @Test
    public void blockUser(){
        userService.blockUser(5);
        ClientAuth test =  userauthRepository.getOne(5);
        assertEquals(2,test.getUserType());

    }

    @Transactional
    @Test
    public void unblockUser(){
        userService.unblockUser(5);
        ClientAuth test =  userauthRepository.getOne(5);
        assertEquals(1,test.getUserType());
    }

    @Transactional
    @Test
    public void getAllUsers(){
         List<ClientAuth> test  = userService.getAllUsers();
         assertEquals(5,test.get(0).getUserId());
         assertEquals("aaa",test.get(0).getUsername());
    }

    @Transactional
    @Test
    public void addUser(){
        int status = userService.addUser("test","123").getStatus();
        assertEquals(0,status);
    }

    @Test
    public void checkUserDuplicate(){
        int status1 = userService.checkUserDuplicate("aaa").getStatus();
        int status2 = userService.checkUserDuplicate("ccc").getStatus();

        assertEquals(0,status2);      //用户名未重复
        assertEquals(-1,status1);     //用户名重复
    }

    @Test
    public void updateUserDetail(){
        Client test  = new Client();
        test.setUserId(1);
        test.setName("sjw");
        test.setGender(1);
        test.setNickname("weiwei");
        int status = userService.updateUserDetail(test).getStatus();
        assertEquals(0,status);
    }

    @Test
    public void update_and_deleteTicketHolder(){
        TicketHolder test =  new TicketHolder();
        test.setName("test");
        int status1 = userService.updateTicketHolder(test,1).getStatus();   //新建
        assertEquals(0,status1);
        int status2 = userService.deleteTicketHolder(9).getStatus(); //删除
        assertEquals(0,status2);
    }

    @Test
    public void updateTickerHolder(){
        TicketHolder test =  new TicketHolder();
        test.setTicketHolderId(1);
        test.setName("Shen Jiawei");
        test.setIdType("ID-card");
        test.setIdNum("test");
        int status = userService.updateTicketHolder(test,1).getStatus();
        assertEquals(0,status);
    }

    @Test
    public void update_and_deleteReceiver(){
        Receiver test =  new Receiver();
        test.setReceiver("test");
        int status1 = userService.updateReceiver(test,1).getStatus();   //新建
        assertEquals(0,status1);
        int status2 = userService.deleteReceiver(13).getStatus();    //删除
        assertEquals(-1,status2);     //-1 -> 0
    }

    @Test
    public void updateTickerReceiver(){
        Receiver test =  new Receiver();
        test.setReceiverId(1);
        test.setReceiver("Shen Jiawei");
        test.setAddress("Shanghai Jiao Tong University");
        test.setTel("12345678900");
        int status = userService.updateReceiver(test,1).getStatus();
        assertEquals(0,status);
    }

}
