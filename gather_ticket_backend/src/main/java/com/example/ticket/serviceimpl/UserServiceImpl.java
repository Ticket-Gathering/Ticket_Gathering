package com.example.ticket.serviceimpl;

import com.example.ticket.dao.UserDao;
import com.example.ticket.entity.Clients_auth;
import com.example.ticket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public Clients_auth checkUser(String username, String password) {
        return userDao.checkUser(username, password);
    }
}
