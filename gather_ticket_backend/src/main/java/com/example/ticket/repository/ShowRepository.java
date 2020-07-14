package com.example.ticket.repository;

import com.example.ticket.entity.show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShowRepository extends JpaRepository<show,Integer> {
     List<show> findByCategory(Integer Categoryid);

     show findByShowId(Integer Showid);

     @Query(nativeQuery=true,value="select * from perform where category=?1 ORDER BY rand() LIMIT 7")
     List<show>  findForHomePageByCategory(Integer Showid);
}
