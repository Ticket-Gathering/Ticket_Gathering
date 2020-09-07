package com.example.ticket.repository;

import com.example.ticket.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    List<Category>  findAll();
}
