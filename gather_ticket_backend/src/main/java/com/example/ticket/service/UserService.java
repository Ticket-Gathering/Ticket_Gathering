package com.example.ticket.service;

import com.example.ticket.entity.clients;
import com.example.ticket.entity.clients_auth;

public interface UserService {
    clients_auth checkUser(String username, String password);

    clients getUserById(int userId);
}
