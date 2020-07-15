package com.example.ticket.daoimpl;

import com.example.ticket.dao.ShowDao;
import com.example.ticket.entity.Show;
import com.example.ticket.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ShowDaoImpl implements ShowDao {
    @Autowired
    ShowRepository showRepository;

    @Override
    public List<Show> findByCategory(Integer Categoryid) {
        return showRepository.findByCategory(Categoryid);
    }

    @Override
    public Show getByShowid(Integer Showid) {
        return showRepository.findByShowId(Showid);
    }

    @Override
    public List<Show> findForHomePageByCategory(Integer Showid) {
        return showRepository.findForHomePageByCategory(Showid);
    }

    @Override
    public List<Show> findByKeyWordAndCategoryWithNumber(String keyword, Integer categoryid,Integer pagesize,Integer currentpage) {
        return showRepository.findByKeyWordAndCategoryWithNumber(keyword,categoryid,pagesize,currentpage);
    }

    @Override
    public List<Show> findByKeywordWithNumber(String keyword,Integer pagesize ,Integer currentpage) {
        return showRepository.findByKeywordWithNumber(keyword,pagesize,currentpage);
    }

//    @Override
//    public List<Show> searchShow2(String keyword, Integer categoryid) {
//        return showRepository.findB;
//    }
}
