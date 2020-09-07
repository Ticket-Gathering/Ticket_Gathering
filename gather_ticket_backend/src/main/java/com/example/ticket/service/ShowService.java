package com.example.ticket.service;

import com.example.ticket.entity.Show;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

public interface ShowService {

    List<String> getAllCityWithShowNow();

    List<List<Show>> getHomePage(int fetchTime);

    List<Show>  searchShow(String keyword,Integer categoryid,String cityname,Integer subid,Integer pagesize,Integer currentsize);

    List<Show> recommendByCategory(int subCategory);

    List<Object[]> getPlatformList(String id);

    List<Show> recommendByKeyword(String keyword);
}
