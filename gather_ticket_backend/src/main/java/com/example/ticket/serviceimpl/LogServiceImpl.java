package com.example.ticket.serviceimpl;

import com.example.ticket.dao.LogDao;
import com.example.ticket.entity.OperationLog;
import com.example.ticket.service.LogService;
import com.example.ticket.utils.msgutils.Msg;
import com.example.ticket.utils.msgutils.MsgCode;
import com.example.ticket.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class LogServiceImpl implements LogService {
    @Autowired
    private LogDao logdao;

    @Override
    public Msg logOperation(int adminId, String operation){
        Date date = new Date();
        OperationLog ol = logdao.logOperation(adminId, operation, date);
        if(ol != null){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);
        }
    }
}
