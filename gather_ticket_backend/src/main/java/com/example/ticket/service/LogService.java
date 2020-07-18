package com.example.ticket.service;

import com.example.ticket.utils.msgutils.Msg;

public interface LogService {
    public Msg logOperation(int adminId, String operation);
}
