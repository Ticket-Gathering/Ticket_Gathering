package com.example.ticket.controller;

import com.example.ticket.entity.show;
import com.example.ticket.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ShowController {

    @Autowired
    private ShowService showService;

    @RequestMapping("/getShowByCategory")
    public List<show> getShowByCategory(@RequestParam("category") Integer Categoryid) {
        return showService.findByCategory(Categoryid);
    }

    @RequestMapping("/getShowByShowId")
    public show getShowByShowId(@RequestParam("id") Integer Showid)
    {
        return showService.getByShowid(Showid);
    }

    @RequestMapping("/getHomePage")
    public List<List<show>> getHomePage()
    {
        return showService.getHomePage();
    }

}
