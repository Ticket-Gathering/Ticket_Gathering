package com.example.ticket.dao;

import com.example.ticket.entity.clients;
import com.example.ticket.entity.clients_auth;

import java.util.List;

public interface UserDao {
    clients_auth checkUser(String username, String password);

    clients getUserById(int userId);
}
