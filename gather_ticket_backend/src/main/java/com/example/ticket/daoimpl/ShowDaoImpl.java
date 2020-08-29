package com.example.ticket.daoimpl;

import com.example.ticket.dao.ShowDao;
import com.example.ticket.entity.Show;
import com.example.ticket.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ShowDaoImpl implements ShowDao {
    @Autowired
    ShowRepository showRepository;

    @Override
    public List<String> findAllCityWithShowNow() {
        return showRepository.findAllCityWithShowNow();
    }

    @Override
    public List<Show> findForHomePageByCategory(Integer Showid) {
        return showRepository.findForHomePageByCategory(Showid);
    }

    @Override
    public List<Show> findByKeywordAndCategoryWithNumber(String keyword, Integer categoryid,Integer pagesize,Integer currentpage) {
        return showRepository.findByKeywordAndCategoryWithNumber(keyword,categoryid,pagesize,currentpage);
    }

    @Override
    public List<Show> findByKeywordWithNumber(String keyword,Integer pagesize ,Integer currentpage) {
        return showRepository.findByKeywordWithNumber(keyword,pagesize,currentpage);
    }

    @Override
    public List<Show> findByKeywordAndCityWithNumber(String keyword, String cityname, Integer pagesize, Integer currentpage) {
        return showRepository.findByKeywordAndCityWithNumber(keyword,cityname,pagesize,currentpage);
    }

    @Override
    public List<Show> findByKeywordAndCategoryAndCityWithNumber(String keyword, Integer category, String cityname, Integer pagesize, Integer currentpage) {
        return showRepository.findByKeywordAndCategoryAndCityWithNumber(keyword,category,cityname,pagesize,currentpage);
    }

    @Override
    public List<Show> findByCategoryAndSubCatWithNumber(String keyword, Integer categoryid, Integer subid, Integer pagesize, Integer currentpage) {
        return showRepository.findByCategoryAndSubCatWithNumber(keyword,categoryid,subid,pagesize,currentpage);
    }

    @Override
    public List<Show> findByAllFactor(String keyword, Integer categoryid, String cityname, Integer subid, Integer pagesize, Integer currentsize) {
        return showRepository.findByAllFactor(keyword,categoryid,cityname,subid,pagesize,currentsize);
    }

    @Override
    public List<Show> recommendByCategory(int subCategory){
        return showRepository.recommendByCategory(subCategory);
    }

    @Override
    public List<Object[]> getPlatformList(String id) {
        return showRepository.getPlatformList(id);
    };
}
