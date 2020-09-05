package com.example.ticket.controller;

import com.example.ticket.entity.Show;
import com.example.ticket.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ShowController {

    @Autowired
    private ShowService showService;

//    //仅测试用
//    @RequestMapping("/getShowByCategory")
//    public List<Show> getShowByCategory(@RequestParam("category") Integer Categoryid) {
//        return showService.findByCategory(Categoryid);
//    }
//
//    //仅仅测试用
//    @RequestMapping("/getShowByShowId")
//    public Show getShowByShowId(@RequestParam("id") Integer id)
//    {
//        return showService.getByShowid(id);
//    }
    @RequestMapping("/show/getAllCityWithShowNow")
    public List<String> getAllCityWithShowNow()
    {
        return showService.getAllCityWithShowNow();
    }

    @RequestMapping("/show/getHomePage/{fetchTime}")
    public List<List<Show>> getHomePage(@PathVariable("fetchTime") int fetchTime)
    {
        return showService.getHomePage(fetchTime);
    }

    @RequestMapping("/show/searchShow")
    public List<Show> searchShow(@RequestParam("keyword") String keyword , @RequestParam("category") Integer categoryid, @RequestParam("city") String cityname, @RequestParam("sub_category") Integer subid,@RequestParam("pagesize") Integer pagesize,@RequestParam("currentsize") Integer currentpage ){
        keyword="%"+keyword+"%";
        currentpage=(currentpage-1)*pagesize;
        return showService.searchShow(keyword,categoryid,cityname,subid,pagesize,currentpage);
    }

    @RequestMapping("/show/recommendByCategory/{subCategory}")
    public List<Show> recommendByCategory(@PathVariable("subCategory") int subCategory){
        return showService.recommendByCategory(subCategory);
    }

    @RequestMapping("/show/getPlatformList/{id}")
    public List<Object[]> getPlatformList(@PathVariable("id") String id){
        return  showService.getPlatformList(id);
    }
}
