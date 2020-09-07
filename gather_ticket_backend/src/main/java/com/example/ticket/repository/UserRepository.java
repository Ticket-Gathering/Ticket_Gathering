package com.example.ticket.repository;

import com.example.ticket.entity.Client;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<Client,Integer>{
}