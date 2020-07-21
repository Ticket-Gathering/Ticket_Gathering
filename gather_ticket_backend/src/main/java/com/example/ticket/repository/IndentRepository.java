package com.example.ticket.repository;

import com.example.ticket.entity.Indent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndentRepository extends JpaRepository<Indent,Integer> {
}
