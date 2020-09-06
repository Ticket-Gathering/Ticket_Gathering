package com.example.ticket.repository;

import com.example.ticket.entity.Indent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IndentRepository extends JpaRepository<Indent,Integer> {
    @Query(value = "from Indent where username=?1")
    List<Indent> getIndentByUsername(String username);
}
