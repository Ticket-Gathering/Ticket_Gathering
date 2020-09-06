package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.entity.Indent;
import com.example.ticket.repository.IndentRepository;
import com.example.ticket.service.IndentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = TicketApplication.class,webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class IndentServiceTest {
    @Autowired
    private IndentService indentService;

    @Autowired
    private IndentRepository indentRepository;

    @Test
    public void contextLoads(){
    }

    @Transactional
    @Test
    public void addIndent(){
        int orderid = indentService.addIndent("sjw","test",10.0,1,10.0,"test","123","test","test","test");
        Indent test = indentRepository.getOne(orderid);
        assertEquals("sjw",test.getUsername());
        assertEquals("test",test.getShowid());
        assertEquals(10.0,test.getFacevalue());
        assertEquals(1,test.getNum());
        assertEquals(10.0,test.getPayamount());
        assertEquals("test",test.getReceiver_name());
        assertEquals("123",test.getReceiver_tel());
        assertEquals("test",test.getReceiver_address());
        assertEquals("test",test.getSelected_time());
    }

    @Transactional
    @Test
    public void updateIndentTest(){
        Indent test = indentRepository.getOne(3);
        indentService.updateIndent(3,3);
        assertEquals(3,test.getOrder_status());
    }

    @Test
    public void getIndentByID(){

    }
}
