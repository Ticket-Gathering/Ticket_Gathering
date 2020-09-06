package com.example.ticket.repository;

import com.example.ticket.entity.ClientAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserAuthRepository extends JpaRepository<ClientAuth,Integer>{
    @Query(value = "from ClientAuth where username = :username and password = :password")
    ClientAuth checkUser(@Param("username") String username, @Param("password") String password);

    @Query(value = "from ClientAuth where username = :username")
    ClientAuth getUserAuthByUsername(@Param("username") String username);

    @Query(value = "from ClientAuth where userType <> 0")
    List<ClientAuth> getAllUsers();


}
