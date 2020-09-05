package com.example.ticket.repository;

import com.example.ticket.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShowRepository extends JpaRepository<Show,Integer> {
     List<Show> findByCategory(Integer Categoryid);

     @Query(nativeQuery = true,value="select * from perform where id=?1 and platform=?2")
     Show findByShowIdAndPlatform(String id,String platform);

     @Query(nativeQuery = true,value="select distinct city from perform")
     List<String> findAllCityWithShowNow();

     @Query(nativeQuery=true,value="select * from perform where category=?1 ORDER BY rand() LIMIT 7")
     List<Show>  findForHomePageByCategory(Integer Showid);

     @Query(nativeQuery=true,value="select * from perform where name like ?1 and category=?2 LIMIT ?4,?3")
     List<Show>  findByKeywordAndCategoryWithNumber(String keyword,Integer categoryid,Integer pagesize,Integer currentpage );

     @Query(nativeQuery=true,value="select * from perform where name like ?1 LIMIT ?3,?2")
     List<Show>  findByKeywordWithNumber(String keyword,Integer pagesize,Integer currentpage);

     @Query(nativeQuery =true,value="select * from perform where name like ?1 and city=?2 LIMIT ?4,?3")
     List<Show>  findByKeywordAndCityWithNumber(String keyword,String cityname,Integer pagesize,Integer currentpage);

     @Query(nativeQuery =true,value="select * from perform where name like ?1 and category=?2 and city=?3 LIMIT ?5,?4")
     List<Show> findByKeywordAndCategoryAndCityWithNumber(String keyword, Integer category, String cityname, Integer pagesize, Integer currentpage);

     @Query(nativeQuery =true,value="select * from perform where name like ?1 and category=?2 and sub_category=?3 LIMIT ?5,?4")
     List<Show> findByCategoryAndSubCatWithNumber(String keyword,Integer categoryid,Integer subid,Integer pagesize,Integer currentpage);

     @Query(nativeQuery = true,value="select * from perform where name like ?1 and category=?2 and city=?3 and sub_category=?4 LIMIT ?6,?5")
     List<Show> findByAllFactor(String keyword,Integer categoryid,String cityname,Integer subid,Integer pagesize,Integer currentsize);

     @Query(nativeQuery = true,value="select * from perform where sub_category=?1 ORDER BY rand() LIMIT 6")
     List<Show> recommendByCategory(Integer subCategory);

     @Query(nativeQuery = true,value="select * from perform where platform = '大麦网' AND keyword LIKE ?1 ORDER BY rand() LIMIT 6")
     List<Show> recommendByKeyword(String keyword);

     @Query(nativeQuery = true,value="select platform, price_low from perform where id=?1")
     List<Object[]> getPlatformList(String id);
}
