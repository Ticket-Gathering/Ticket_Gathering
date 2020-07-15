package com.example.ticket.repository;

import com.example.ticket.entity.Clients_auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserAuthRepository extends JpaRepository<Clients_auth,String>{
    @Query(value = "from Clients_auth where username = :username and password = :password")
    Clients_auth checkUser(@Param("username") String username, @Param("password") String password);
}
