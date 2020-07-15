package com.example.ticket.dao;

import com.example.ticket.entity.Show;

import java.util.List;

public interface ShowDao {
     List<Show> findByCategory(Integer Categoryid);
     Show getByShowid(Integer Showid);
     List<Show> findForHomePageByCategory(Integer Showid);
     List<Show> findByKeyWordAndCategoryWithNumber(String keyword, Integer categoryid,Integer pagesize,Integer currentpage);
     List<Show> findByKeywordWithNumber(String keyword,Integer pagesize,Integer currentpage);
}
