package com.example.ticket.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.beans.IntrospectionException;
import java.util.Date;

@Entity
@Table(name = "indent")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "orderId")
public class Indent {
    private int orderId;

    private String show_id;
    private Double facevalue;
    private Integer num;
    private Double payamount;
    private String receiver_name;
    private String receiver_tel;
    private String receiver_address;
    private Integer order_status;
    private String username;

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public int getOrderId() { return this.orderId; }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    @Basic
    @Column(name = "show_id")
    public String getShowid() {return show_id;}

    public void setShowid(String show_id) {
        this.show_id = show_id;
    }

    @Basic
    @Column(name = "facevalue")
    public Double getFacevalue() {return facevalue;}

    public void setFacevalue(Double facevalue) {
        this.facevalue = facevalue;
    }

    @Basic
    @Column(name = "num")
    public Integer getNum() {return  num;}

    public void setNum(Integer num) {
        this.num = num;
    }

    @Basic
    @Column(name = "payamount")
    public Double getPayamount() {return  payamount;}

    public void setPayamount(Double payamount) {
        this.payamount = payamount;
    }

    @Basic
    @Column(name = "receiver_name")
    public String getReceiver_name() {return  receiver_name;}

    public void setReceiver_name(String name) {
        this.receiver_name = name;
    }

    @Basic
    @Column(name = "receiver_tel")
    public String getReceiver_tel() {return receiver_tel;}

    public void setReceiver_tel(String tel) {
        this.receiver_tel = tel;
    }

    @Basic
    @Column(name = "receiver_address")
    public String getReceiver_address() {return  receiver_address;}

    public void setReceiver_address(String receiver_address) {
        this.receiver_address = receiver_address;
    }

    @Basic
    @Column(name = "order_status")
    public Integer getOrder_status() {return  order_status;}

    public void setOrder_status(Integer status) {
        this.order_status = status;
    }

    @Basic
    @Column(name = "username")
    public String getUsername() {return  username;}

    public void setUsername(String name) {
        this.username = name;
    }
}
