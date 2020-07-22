package com.example.ticket.repository;

import com.example.ticket.entity.ShowDetail;
import org.hibernate.cfg.beanvalidation.GroupsPerOperation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ShowDetailRepository extends MongoRepository<ShowDetail, String> {
    Optional<ShowDetail> findById(String id);
}
