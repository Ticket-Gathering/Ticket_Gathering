package com.example.ticket.daoimpl;

import com.example.ticket.dao.UserDao;
import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.entity.Receiver;
import com.example.ticket.entity.TicketHolder;
import com.example.ticket.repository.ReceiverRepository;
import com.example.ticket.repository.TicketHolderRepository;
import com.example.ticket.repository.UserAuthRepository;
import com.example.ticket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class UserDapImpl implements UserDao{
    @Autowired
    UserAuthRepository userAuthRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReceiverRepository receiverRepository;

    @Autowired
    TicketHolderRepository ticketHolderRepository;

    @Autowired
    @Lazy
    PasswordEncoder passwordEncoder;

    @Override
    public ClientAuth checkUser(String username, String password){
        return userAuthRepository.checkUser(username,password);
    }

    @Override
    public Client getUserById(int userId){
        System.out.println(userRepository.getOne(userId).getReceiverList());
        System.out.println(userRepository.getOne(userId).getTicketHolderList());
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
        CA.setPassword(passwordEncoder.encode(password));
//        CA.setPassword(password);
        CA.setUserType(1);
        userAuthRepository.save(CA);
        Client C = new Client();
        C.setNickname("Anonymous");
        C.setName("Anonymous");
        C.setGender(2);
        C.setMessageChecked(1);
        userRepository.save(C);
        return C;
    }

    @Override
    public List<ClientAuth> getAllUsers(){
        return userAuthRepository.getAllUsers();
    }

    @Override
    public ClientAuth blockUser(int userId){
        ClientAuth CA = userAuthRepository.getOne(userId);
        CA.setUserType(2);
        userAuthRepository.save(CA);
        return CA;
    }

    @Override
    public ClientAuth unblockUser(int userId){
        ClientAuth CA = userAuthRepository.getOne(userId);
        CA.setUserType(1);
        userAuthRepository.save(CA);
        return CA;
    }

    @Override
    public Client updateUserDetail(Client client) {
        return userRepository.save(client);
    }

    @Override
    public void deleteTicketHolder(int ticketHolderId) {
        ticketHolderRepository.deleteById(ticketHolderId);
    }

    @Override
    public void deleteReceiver(int receiverId) {
        receiverRepository.deleteById(receiverId);
    }

    @Override
    public TicketHolder updateTicketHolder(TicketHolder ticketHolder,int userId) {
        Client client=userRepository.getOne(userId);
        ticketHolder.setClient(client);
        return ticketHolderRepository.save(ticketHolder);
    }

    @Override
    public Receiver updateReceiver(Receiver receiver,int userId) {
        Client client=userRepository.getOne(userId);
        receiver.setClient(client);
        return receiverRepository.save(receiver);
    }
}
