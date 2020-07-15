package com.example.ticket.serviceimpl;

import com.example.ticket.dao.CategoryDao;
import com.example.ticket.dao.ShowDao;
import com.example.ticket.entity.Category;
import com.example.ticket.entity.Show;
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
    public List<Show> findByCategory(Integer Categoryid) {
        return showDao.findByCategory(Categoryid);
    }

    @Override
    public Show getByShowid(Integer Showid) {
        return showDao.getByShowid(Showid);
    }

    @Override
    public List<List<Show>> getHomePage() {
        List<Category> categories = categoryDao.getAllCategory();
        List<List<Show>> homepageshows= new ArrayList<List<Show>>();
        for (Category c : categories) {
            Category one =c;
            Integer id=one.getCategoryId();
            homepageshows.add(showDao.findForHomePageByCategory(id));
        }
        return homepageshows;
    }

    @Override
    public List<Show> searchShow(String keyword, Integer categoryid, Integer cityid, Integer subid, Integer pagesize, Integer currentpage) {
        if(categoryid==null)
            return showDao.findByKeywordWithNumber(keyword,pagesize,currentpage);
        return showDao.findByKeyWordAndCategoryWithNumber(keyword,categoryid,pagesize,currentpage);
    }
}
