package com.example.ticket.Service;


import com.example.ticket.TicketApplication;
import com.example.ticket.entity.ShowDetail;
import com.example.ticket.service.ShowDetailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = TicketApplication.class)
public class ShowDetailServiceTest {
    @Test
    public void contextLoads(){
    }

    @Autowired
    ShowDetailService showDetailService;


}
