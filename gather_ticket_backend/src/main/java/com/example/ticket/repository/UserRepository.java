package com.example.ticket.repository;

import com.example.ticket.entity.clients;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<clients,Integer>{
}