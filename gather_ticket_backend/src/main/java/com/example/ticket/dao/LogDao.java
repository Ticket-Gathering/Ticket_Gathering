package com.example.ticket.dao;

import com.example.ticket.entity.OperationLog;

import java.util.Date;

public interface LogDao {
    OperationLog logOperation(int adminId, String operation, Date date);
}
