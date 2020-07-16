package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.entity.Show;
import com.example.ticket.service.ShowService;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;


@SpringBootTest(classes = TicketApplication.class)
public class ShowServiceTest {
    @Test
    public void contextLoads(){
    }

    @Autowired
    private ShowService showService;

    @Test
    public void getHomePage_successfully(){

        List<List<Show>> expect = showService.getHomePage();
        Integer expectnumber = expect.size();
        //assertEquals(8,expectnumber);

    }
}
