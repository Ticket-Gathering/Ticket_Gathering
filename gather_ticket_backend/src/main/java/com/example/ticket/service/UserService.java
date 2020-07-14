package com.example.ticket.service;

import com.example.ticket.entity.clients;
import com.example.ticket.entity.clients_auth;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface UserService {
    clients_auth checkUser(String username, String password);
}
