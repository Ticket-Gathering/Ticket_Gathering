package com.example.ticket.service;

import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.utils.msgutils.Msg;

public interface UserService {
    ClientAuth checkUser(String username, String password);

    Client getUserById(int userId);

    Msg checkUserDuplicate(String username);

    Msg addUser(String username, String password);
}
