package com.example.ticket.service;

import com.example.ticket.entity.Show;

import java.util.List;

public interface ShowService {
    List<Show> findByCategory(Integer Categoryid);

    List<String> getAllCityWithShowNow();

    List<List<Show>> getHomePage();

    List<Show>  searchShow(String keyword,Integer categoryid,String cityname,Integer subid,Integer pagesize,Integer currentsize);

    List<Show> recommendByCategory(int subCategory);
}
