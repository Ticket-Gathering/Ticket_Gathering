package com.example.ticket.serviceimpl;

import com.example.ticket.dao.CategoryDao;
import com.example.ticket.dao.ShowDao;
import com.example.ticket.entity.Category;
import com.example.ticket.entity.show;
import com.example.ticket.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ShowServiceImpl implements ShowService {
    @Autowired
    ShowDao showDao;

    @Autowired
    CategoryDao categoryDao;

    @Override
    public List<show> findByCategory(Integer Categoryid) {
        return showDao.findByCategory(Categoryid);
    }

    @Override
    public show getByShowid(Integer Showid) {
        return showDao.getByShowid(Showid);
    }

    @Override
    public List<List<show>> getHomePage() {
        List<Category> categories = categoryDao.getAllCategory();
        List<List<show>> homepageshows= new ArrayList<List<show>>();
        for (Category c : categories) {
            Category one =c;
            Integer id=one.getCategoryId();
            homepageshows.add(showDao.findForHomePageByCategory(id));
        }
        return homepageshows;
    }
}
