package com.example.ticket.dao;

import com.example.ticket.entity.ShowDetail;
import com.example.ticket.repository.ShowDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;

public interface ShowDetailDao {
    ShowDetail getDetail(String id);
}
