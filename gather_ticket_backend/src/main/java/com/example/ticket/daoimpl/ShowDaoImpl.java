package com.example.ticket.daoimpl;

import com.example.ticket.dao.ShowDao;
import com.example.ticket.entity.show;
import com.example.ticket.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ShowDaoImpl implements ShowDao {
    @Autowired
    ShowRepository showRepository;

    @Override
    public List<show> findByCategory(Integer Categoryid) {
        return showRepository.findByCategory(Categoryid);
    }

    @Override
    public show getByShowid(Integer Showid) {
        return showRepository.findByShowId(Showid);
    }

    @Override
    public List<show> findForHomePageByCategory(Integer Showid) {
        return showRepository.findForHomePageByCategory(Showid);
    }
}
