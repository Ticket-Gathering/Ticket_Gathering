package com.example.ticket.daoimpl;

import com.example.ticket.dao.UserDao;
import com.example.ticket.entity.clients;
import com.example.ticket.entity.clients_auth;
import com.example.ticket.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class UserDapImpl implements UserDao{
    @Autowired
    UserAuthRepository userAuthRepository;

    @Override
    public clients_auth checkUser(String username, String password){
        return userAuthRepository.checkUser(username,password);
    }
}
