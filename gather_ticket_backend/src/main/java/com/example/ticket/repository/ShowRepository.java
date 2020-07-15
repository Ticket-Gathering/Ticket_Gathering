package com.example.ticket.repository;

import com.example.ticket.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

public interface ShowRepository extends JpaRepository<Show,Integer> {
     List<Show> findByCategory(Integer Categoryid);

     Show findByShowId(Integer Showid);

     @Query(nativeQuery=true,value="select * from perform where category=?1 ORDER BY rand() LIMIT 7")
     List<Show>  findForHomePageByCategory(Integer Showid);

     @Query(nativeQuery=true,value="select * from perform where name like ?1 and category=?2 LIMIT ?4,?3")
     List<Show>  findByKeyWordAndCategoryWithNumber(String keyword,Integer categoryid,Integer pagesize,Integer currentpage );

     @Query(nativeQuery=true,value="select * from perform where name like ?1 LIMIT ?3,?2")
     List<Show>   findByKeywordWithNumber(String keyword,Integer pagesize,Integer currentpage);
}
