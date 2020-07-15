package com.example.ticket.service;

import com.example.ticket.entity.Show;

import java.util.List;

public interface ShowService {
    List<Show> findByCategory(Integer Categoryid);

    Show getByShowid(Integer Showid);

    List<List<Show>> getHomePage();

    List<Show>  searchShow(String keyword,Integer categoryid,Integer cityid,Integer subid,Integer pagesize,Integer currentsize);
}
