package com.example.ticket.serviceimpl;

import com.example.ticket.dao.UserDao;
import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.entity.Receiver;
import com.example.ticket.entity.TicketHolder;
import com.example.ticket.service.UserService;
import com.example.ticket.utils.msgutils.Msg;
import com.example.ticket.utils.msgutils.MsgCode;
import com.example.ticket.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Override
    public List<ClientAuth> getAllUsers(){
        return userDao.getAllUsers();
    }

    @Override
    public Msg blockUser(int userId){
        ClientAuth C = userDao.blockUser(userId);
        if(C != null){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);
        }
    }

    @Override
    public Msg unblockUser(int userId){
        ClientAuth C = userDao.unblockUser(userId);
        if(C != null){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);
        }
    }

    @Override
    public Msg updateUserDetail(Client client) {
        Client newClient=userDao.updateUserDetail(client);
        if(newClient!= null){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);
        }
    }

    @Override
    public Msg deleteTicketHolder(int ticketHolderId) {
         userDao.deleteTicketHolder(ticketHolderId);
         return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
    }

    @Override
    public Msg deleteReceiver(int receiverId) {
        userDao.deleteReceiver(receiverId);
        return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);
    }

    @Override
    public Msg updateTicketHolder(TicketHolder ticketHolder,int userId) {
        TicketHolder aTicketHolder=userDao.updateTicketHolder(ticketHolder,userId);
        if(aTicketHolder!= null){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);
        }
    }

    @Override
    public Msg updateReceiver(Receiver receiver,int userId) {
        Receiver aReceiver=userDao.updateReceiver(receiver,userId);
        if(aReceiver!= null){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.SUCCESS_MSG);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.ERROR_MSG);
        }
    }
}
