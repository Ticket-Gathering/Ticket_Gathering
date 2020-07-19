package com.example.ticket.daoimpl;

import com.example.ticket.dao.LogDao;
import com.example.ticket.entity.OperationLog;
import com.example.ticket.repository.OperationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class LogDaoImpl implements LogDao {
    @Autowired
    private OperationLogRepository operationLogRepository;

    @Override
    public OperationLog logOperation(int adminId, String operation, Date date){
        OperationLog ol = new OperationLog();
        ol.setAdminId(adminId);
        ol.setOperation(operation);
        ol.setTimestamp(date);
        operationLogRepository.save(ol);
        return ol;
    }
}
