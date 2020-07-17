package com.example.ticket.dao;

import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;

public interface UserDao {
    ClientAuth checkUser(String username, String password);

    Client getUserById(int userId);

    ClientAuth checkUserDuplicate(String username);

    Client addUser(String username, String password);
}
