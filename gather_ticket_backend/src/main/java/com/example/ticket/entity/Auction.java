package com.example.ticket.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "auction")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "aucid")
public class Auction {
    @Id
    @Column(name="auction_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  Integer aucid;

    private  String  show_id;
    public  void setShow_id(String show_id){
        this.show_id=show_id;
    }
    public String getShow_id(){
        return show_id;
    }

    private  Double start_price;
    public Double getStart_price(){
        return this.start_price;
    }
    public void setStart_price(Double start_price){
        this.start_price=start_price;
    }

    private Double step_price;
    public Double getStep_price(){
        return this.step_price;
    }
    public void setStep_price(Double step_price){
        this.step_price=step_price;
    }

    private String start_time;
    public String getStart_time(){
        return this.start_time;
    }
    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    private String end_time;
    public String getEnd_time()
    {
        return this.end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    private Double highest_price;
    public Double getHighest_Price(){
        return this.highest_price;
    }

    public void setHighest_price(Double highest_price){
        this.highest_price=highest_price;
    }
    private Integer highest_user_id;
    public void setHighest_user_id(Integer highest_user_id){
        this.highest_user_id=highest_user_id;
    }

    public Integer getHighest_user_id() {
        return this.highest_user_id;
    }

    private Integer highest_user_name;

    @Transient
    private  ShowDetail showDetail;

    public ShowDetail getShowDetail() {
        return showDetail;
    }

    public void setShowDetail(ShowDetail showDetail){
        this.showDetail=showDetail;
    }

    @Transient
    private Show show;
    public Show getShow(){
        return show;
    }
    public void setShow(Show show){
        this.show=show;
    }

}
