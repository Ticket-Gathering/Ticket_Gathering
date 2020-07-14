package com.example.ticket.dao;

import com.example.ticket.entity.show;

import java.util.List;

public interface ShowDao {
     List<show> findByCategory(Integer Categoryid);
     show getByShowid(Integer Showid);
     List<show> findForHomePageByCategory(Integer Showid);
}
