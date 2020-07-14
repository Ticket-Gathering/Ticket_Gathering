package com.example.ticket.serviceimpl;

import com.example.ticket.dao.UserDao;
import com.example.ticket.entity.clients;
import com.example.ticket.entity.clients_auth;
import com.example.ticket.repository.UserRepository;
import com.example.ticket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public clients_auth checkUser(String username, String password) {
        return userDao.checkUser(username, password);
    }
}
