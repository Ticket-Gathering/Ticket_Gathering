package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.entity.Show;
import com.example.ticket.service.ShowService;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest(classes = TicketApplication.class)
public class ShowServiceTest {
    @Test
    public void contextLoads(){
    }

    @Autowired
    private ShowService showService;

    @Test
    public void getHomePage_successfully(){
        Integer id=1;
        Show testshow=showService.getByShowid(id);
        String name=testshow.getName();
        System.out.println(name);
    }
}
