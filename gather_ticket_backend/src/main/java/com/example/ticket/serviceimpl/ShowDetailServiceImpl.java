package com.example.ticket.serviceimpl;

import com.example.ticket.dao.ShowDetailDao;
import com.example.ticket.entity.ShowDetail;
import com.example.ticket.service.ShowDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShowDetailServiceImpl implements ShowDetailService {
    @Autowired
    ShowDetailDao showDetailDao;

    @Override
    public ShowDetail getDetail(String id) {
        return showDetailDao.getDetail(id);
    }
}
