package com.example.ticket.serviceimpl;

import com.example.ticket.dao.UserDao;
import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public ClientAuth checkUser(String username, String password) {
        return userDao.checkUser(username, password);
    }

    @Override
    public Client getUserById(int userId){
        return userDao.getUserById(userId);
    }
}
