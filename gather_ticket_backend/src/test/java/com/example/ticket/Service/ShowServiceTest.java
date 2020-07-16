package com.example.ticket.Service;

import com.example.ticket.TicketApplication;
import com.example.ticket.entity.Show;
import com.example.ticket.service.ShowService;
import net.sf.json.JSONObject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;


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
        assertEquals(1,expect.size());
    }
}
