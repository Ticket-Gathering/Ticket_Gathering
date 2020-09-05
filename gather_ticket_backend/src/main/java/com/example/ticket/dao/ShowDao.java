package com.example.ticket.dao;

import com.example.ticket.entity.Show;

import java.util.List;
import java.util.Map;

public interface ShowDao {
     List<String>  findAllCityWithShowNow();
     List<Show> findForHomePageByCategory(Integer Showid);
     List<Show> findByKeywordAndCategoryWithNumber(String keyword, Integer categoryid,Integer pagesize,Integer currentpage);
     List<Show> findByKeywordWithNumber(String keyword,Integer pagesize,Integer currentpage);
     List<Show> findByKeywordAndCityWithNumber(String keyword,String cityname,Integer pagesize,Integer currentpage);
     List<Show> findByKeywordAndCategoryAndCityWithNumber(String keyword,Integer category,String cityname,Integer pagesize,Integer currentpage);
     List<Show> findByCategoryAndSubCatWithNumber(String keyword,Integer categoryid,Integer subid,Integer pagesize,Integer currentpage);
     List<Show> findByAllFactor(String keyword,Integer categoryid,String cityname,Integer subid,Integer pagesize,Integer currentsize);
     List<Show> recommendByCategory(int subCategory);
     List<Object[]> getPlatformList(String id);
}
