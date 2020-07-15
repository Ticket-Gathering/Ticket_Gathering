package com.example.ticket.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "receivers")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "receiverId")
public class Receiver {
    private int receiverId;
    private String receiver;
    private String address;
    private String tel;

    public Receiver(){}

    @Id
    @Column(name = "receiver_id")
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public int getReceiverId() { return this.receiverId; }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
    }

    @Column(name = "receiver")
    public String getReceiver() { return this.receiver;}

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    @Column(name = "address")
    public String getAddress() { return this.address;}

    public void setAddress(String address) {
        this.address = address;
    }

    @Column(name = "tel")
    public String getTel() { return this.tel;}

    public void setTel(String tel) {
        this.tel = tel;
    }

    private Client client;

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH}, optional = false, fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public Client getClient() { return this.client;}

    public void setClient(Client client) {
        this.client = client;
    }
}

