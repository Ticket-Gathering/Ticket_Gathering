package com.example.ticket.service;

import com.example.ticket.entity.Show;

import java.util.List;

public interface ShowService {

    List<String> getAllCityWithShowNow();

    List<List<Show>> getHomePage(int fetchTime);

    List<Show>  searchShow(String keyword,Integer categoryid,String cityname,Integer subid,Integer pagesize,Integer currentsize);

    List<Show> recommendByCategory(int subCategory);
}
