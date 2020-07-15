package com.example.ticket.service;

import com.example.ticket.entity.Clients_auth;

public interface UserService {
    Clients_auth checkUser(String username, String password);
}
