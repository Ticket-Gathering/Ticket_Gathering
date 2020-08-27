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
    public List<String> getAllCityWithShowNow() {
        return showDao.findAllCityWithShowNow();
    }

    @Override
    public List<List<Show>> getHomePage(int fetchTime) {
        List<Category> categories = categoryDao.getAllCategory();
        List<List<Show>> homepageshows = new ArrayList<List<Show>>();

        Integer id = categories.get(fetchTime * 2).getCategoryId();
        homepageshows.add(showDao.findForHomePageByCategory(id));

        id = categories.get(fetchTime * 2 + 1).getCategoryId();
        homepageshows.add(showDao.findForHomePageByCategory(id));

        return homepageshows;
    }

    @Override
    public List<Show> searchShow(String keyword, Integer categoryid, String cityname, Integer subid, Integer pagesize, Integer currentpage) {
        if(categoryid==null && cityname.isEmpty() && subid==null)
            return showDao.findByKeywordWithNumber(keyword,pagesize,currentpage);
        else if(cityname.isEmpty() && subid==null)
            return showDao.findByKeywordAndCategoryWithNumber(keyword,categoryid,pagesize,currentpage);
        else if(categoryid==null)
            return showDao.findByKeywordAndCityWithNumber(keyword,cityname,pagesize,currentpage);
        else if(subid==null)
            return showDao.findByKeywordAndCategoryAndCityWithNumber(keyword,categoryid,cityname,pagesize,currentpage);
        else if(cityname.isEmpty())
            return showDao.findByCategoryAndSubCatWithNumber(keyword,categoryid,subid,pagesize,currentpage);
        else
            return showDao.findByAllFactor(keyword,categoryid,cityname,subid,pagesize,currentpage);
    }

    @Override
    public List<Show> recommendByCategory(int subCategory){
        return showDao.recommendByCategory(subCategory);
    }
}
