package com.example.ticket.service;

import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;

public interface UserService {
    ClientAuth checkUser(String username, String password);

    Client getUserById(int userId);
}
