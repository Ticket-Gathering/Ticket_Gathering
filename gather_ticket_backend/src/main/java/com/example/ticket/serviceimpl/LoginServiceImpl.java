package com.example.ticket.serviceimpl;

import com.example.ticket.constant.Constant;
import com.example.ticket.dao.UserDao;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.service.LoginService;
import com.example.ticket.utils.msgutils.Msg;
import com.example.ticket.utils.msgutils.MsgCode;
import com.example.ticket.utils.msgutils.MsgUtil;
import com.example.ticket.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    UserDao userDao;

    @Override
    public Msg login(String username,String password) {
        ClientAuth auth = userDao.checkUser(username, password);
        if(auth != null){
            JSONObject obj = new JSONObject();
            obj.put(Constant.USER_ID, auth.getUserId());
            obj.put(Constant.USERNAME, auth.getUsername());
            SessionUtil.setSession(obj);

            JSONObject data = JSONObject.fromObject(auth);
            data.remove(Constant.PASSWORD);

            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, data);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.LOGIN_USER_ERROR);
        }
    }
}
