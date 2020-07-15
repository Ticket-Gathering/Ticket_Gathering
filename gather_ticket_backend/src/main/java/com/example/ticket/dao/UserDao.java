package com.example.ticket.dao;

import com.example.ticket.entity.Clients_auth;

public interface UserDao {
    clients_auth checkUser(String username, String password);

    clients getUserById(int userId);
}
