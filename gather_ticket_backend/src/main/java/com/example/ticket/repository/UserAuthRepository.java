package com.example.ticket.repository;

import com.example.ticket.entity.ClientAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserAuthRepository extends JpaRepository<ClientAuth,String>{
    @Query(value = "from ClientAuth where username = :username and password = :password")
    ClientAuth checkUser(@Param("username") String username, @Param("password") String password);
}
