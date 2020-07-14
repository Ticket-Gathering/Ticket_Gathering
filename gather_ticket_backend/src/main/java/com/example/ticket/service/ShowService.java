package com.example.ticket.service;

import com.example.ticket.entity.show;

import java.util.List;

public interface ShowService {
    List<show> findByCategory(Integer Categoryid);

    show getByShowid(Integer Showid);

    List<List<show>> getHomePage();
}
