package com.example.ticket.controller;

import com.example.ticket.entity.Show;
import com.example.ticket.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ShowController {

    @Autowired
    private ShowService showService;

    //仅测试用
    @RequestMapping("/getShowByCategory")
    public List<Show> getShowByCategory(@RequestParam("category") Integer Categoryid) {
        return showService.findByCategory(Categoryid);
    }

    //仅仅测试用
    @RequestMapping("/getShowByShowId")
    public Show getShowByShowId(@RequestParam("id") Integer id)
    {
        return showService.getByShowid(id);
    }

    @RequestMapping("/getAllCityWithShowNow")
    public List<String> getAllCityWithShowNow()
    {
        return showService.getAllCityWithShowNow();
    }

    @RequestMapping("/getHomePage")
    public List<List<Show>> getHomePage()
    {
        return showService.getHomePage();
    }

    @RequestMapping("/searchShow")
    public List<Show> searchShow(@RequestParam("keyword") String keyword , @RequestParam("category") Integer categoryid, @RequestParam("city") String cityname, @RequestParam("sub_category") Integer subid,@RequestParam("pagesize") Integer pagesize,@RequestParam("currentsize") Integer currentpage ){
        keyword="%"+keyword+"%";
        currentpage=(currentpage-1)*pagesize;
        return showService.searchShow(keyword,categoryid,cityname,subid,pagesize,currentpage);
    }
}
