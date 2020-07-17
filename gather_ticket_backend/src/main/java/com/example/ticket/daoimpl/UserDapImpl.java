package com.example.ticket.daoimpl;

import com.example.ticket.dao.UserDao;
import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.repository.UserAuthRepository;
import com.example.ticket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class UserDapImpl implements UserDao{
    @Autowired
    UserAuthRepository userAuthRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ClientAuth checkUser(String username, String password){
        return userAuthRepository.checkUser(username,password);
    }

    @Override
    public Client getUserById(int userId){
        System.out.println(userId);
        return userRepository.getOne(userId);
    }

    @Override
    public ClientAuth checkUserDuplicate(String username){
        return userAuthRepository.getUserAuthByUsername(username);
    }

    @Override
    public Client addUser(String username, String password){
        ClientAuth CA = new ClientAuth();
        CA.setUsername(username);
        CA.setPassword(password);
        userAuthRepository.save(CA);
        Client C = new Client();
        C.setNickname("Anonymous");
        C.setName("Anonymous");
        C.setGender(2);
        userRepository.save(C);
        return C;
    }
}
