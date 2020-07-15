package com.example.ticket.entity;

import com.example.ticket.entity.clients;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "ticket_holders")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "ticketHolderId")
public class TicketHolder {
    private int ticketHolderId;
    private String name;
    private String idType;
    private String idNum;

    public TicketHolder(){}

    @Id
    @Column(name = "ticket_holder_id")
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public int getTicketHolderId() { return this.ticketHolderId; }

    public void setTicketHolderId(int ticketHolderId) {
        this.ticketHolderId = ticketHolderId;
    }

    @Column(name = "name")
    public String getName() { return this.name;}

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "id_type")
    public String getIdType() { return this.idType;}

    public void setIdType(String idType) {
        this.idType = idType;
    }

    @Column(name = "id_num")
    public String getIdNum() { return this.idNum;}

    public void setIdNum(String idNum) {
        this.idNum = idNum;
    }

    private clients client;

    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH}, optional = false, fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public clients getClient() { return this.client;}

    public void setClient(clients client) {
        this.client = client;
    }
}
