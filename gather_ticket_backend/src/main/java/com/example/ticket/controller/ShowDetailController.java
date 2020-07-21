package com.example.ticket.controller;

import com.example.ticket.entity.ShowDetail;
import com.example.ticket.service.ShowDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShowDetailController {
    @Autowired
    ShowDetailService showDetailService;

    @RequestMapping("/getDetail")
    ShowDetail getDetail(@RequestParam("id") String id){
        return showDetailService.getDetail(id);
    }
}
