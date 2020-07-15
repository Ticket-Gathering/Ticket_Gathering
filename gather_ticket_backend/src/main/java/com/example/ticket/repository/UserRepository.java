package com.example.ticket.repository;

import com.example.ticket.entity.clients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<clients,Integer>{
}