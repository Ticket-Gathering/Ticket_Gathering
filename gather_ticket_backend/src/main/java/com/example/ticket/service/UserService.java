package com.example.ticket.service;

import com.example.ticket.entity.Client;
import com.example.ticket.entity.ClientAuth;
import com.example.ticket.entity.Receiver;
import com.example.ticket.entity.TicketHolder;
import com.example.ticket.utils.msgutils.Msg;

import java.util.List;

public interface UserService {
    ClientAuth checkUser(String username, String password);

    Client getUserById(int userId);

    Msg checkUserDuplicate(String username);

    Msg addUser(String username, String password);

    List<ClientAuth> getAllUsers();

    Msg blockUser(int userId);

    Msg unblockUser(int userId);

    Msg updateUserDetail(Client client);

    Msg deleteTicketHolder(int ticketHolderId);
    Msg deleteReceiver(int receiverId);
    Msg updateTicketHolder(TicketHolder ticketHolder,int userId);
    Msg updateReceiver(Receiver receiver,int userId);
}
