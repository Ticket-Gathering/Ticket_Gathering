package com.example.ticket.daoimpl;

import com.example.ticket.dao.ShowDetailDao;
import com.example.ticket.entity.Show;
import com.example.ticket.entity.ShowDetail;
import com.example.ticket.repository.ShowDetailRepository;
import com.example.ticket.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Repository
public class ShowDetailDaoImpl implements ShowDetailDao {
    @Autowired
    ShowDetailRepository showDetailRepository;

    @Autowired
    ShowRepository showRepository;

    @Override
    public ShowDetail getDetail(String id) {
        Optional<ShowDetail> detail= showDetailRepository.findById(id);
        if(detail.isPresent()){
            ShowDetail showDetailEntity=detail.get();
            Show show=showRepository.findByShowIdAndAndPlatform(id,"大麦网");
            showDetailEntity.setShow(show);
            return showDetailEntity;
        }
        else {
            return null;
        }
    }
}
