package com.example.ticket.controller;

import com.example.ticket.service.LogService;
import com.example.ticket.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogController {
    @Autowired
    private LogService logService;

    @RequestMapping("/admin/logOperation")
    public Msg logOperation(@RequestParam("adminId") int adminId, @RequestParam("operation") String operation){
        return logService.logOperation(adminId, operation);
    }
}
