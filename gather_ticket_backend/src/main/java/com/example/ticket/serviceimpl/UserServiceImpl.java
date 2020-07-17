package com.example.ticket.serviceimpl;

import com.example.ticket.dao.UserDao;
import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.service.UserService;
import com.example.ticket.utils.msgutils.Msg;
import com.example.ticket.utils.msgutils.MsgCode;
import com.example.ticket.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public ClientAuth checkUser(String username, String password) {
        return userDao.checkUser(username, password);
    }

    @Override
    public Client getUserById(int userId){
        return userDao.getUserById(userId);
    }

    @Override
    public Msg checkUserDuplicate(String username) {
        ClientAuth auth = userDao.checkUserDuplicate(username);
        if(auth != null){
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.USERNAME_DUPLICATE);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.USERNAME_AVAILABLE);
        }
    }

    @Override
    public Msg addUser(String username, String password){
        Client C = userDao.addUser(username, password);
        if(C != null){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SIGNUP_SUCCESS_MSG);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);
        }
    }
}
