package com.example.ticket.service;

import com.example.ticket.utils.msgutils.Msg;

import java.util.Map;

public interface LoginService {
    Msg login(String username,String password);
}
