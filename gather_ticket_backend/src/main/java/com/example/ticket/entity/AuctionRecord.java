package com.example.ticket.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "auc_record")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "record_id")
public class AuctionRecord {
    @Id
    @Column(name="record_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer record_id;

    private Integer user_id;
    public void setUser_id(Integer user_id){
        this.user_id=user_id;
    }
    public Integer getUser_id(){
        return this.user_id;
    }

    private Integer auction_id;
    public void setAuction_id(Integer auction_id){
        this.auction_id=auction_id;
    }

    @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd HH:mm:ss")
    private Date record_time;
    public  void setRecord_time(Date record_time){
        System.out.println(record_time);
        this.record_time=record_time;
    }

    private Double record_price;
    public void setRecord_price(Double record_price){
        this.record_price=record_price;
    }
    public Double getRecord_price(){
        return this.record_price;
    }

    private Integer if_check;
    public Integer getIf_check()
    {
        return this.if_check;
    }
    public void setIf_check(Integer if_check){
        this.if_check=if_check;
    }

}
