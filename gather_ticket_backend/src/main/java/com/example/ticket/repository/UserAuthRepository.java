package com.example.ticket.repository;

import com.example.ticket.entity.clients_auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserAuthRepository extends JpaRepository<clients_auth,String>{
    @Query(value = "from clients_auth where username = :username and password = :password")
    clients_auth checkUser(@Param("username") String username, @Param("password") String password);
}
