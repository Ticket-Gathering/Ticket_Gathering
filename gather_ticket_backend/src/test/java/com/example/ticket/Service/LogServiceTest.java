package com.example.ticket.Service;
import com.example.ticket.service.LogService;

import com.example.ticket.TicketApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = TicketApplication.class,webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LogServiceTest {
    @Test
    public void contextLoads(){
    }

    @Autowired
    private LogService logService;

    @Test
    public void log_successfully(){
        int adminId = 1;
        String operation = "Test(Block user with id:5)";

        int status = logService.logOperation(adminId,operation).getStatus();
        assertEquals(0,status);
    }

}
