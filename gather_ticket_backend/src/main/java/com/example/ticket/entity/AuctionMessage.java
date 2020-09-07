package com.example.ticket.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "auc_message")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "message_id")
public class AuctionMessage {
    @Id
    @Column(name="message_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer message_id;

    public Integer getMessageId() {
        return message_id;
    }
    public void setMessageId(Integer message_id) {
        this.message_id = message_id;
    }

    private Integer user_id;

    public Integer getUserId() {
        return user_id;
    }
    public void setUserId(Integer user_id) {
        this.user_id = user_id;
    }

    private Integer auction_id;

    public Integer getAuctionId() {
        return auction_id;
    }

    public void setAuctionId(Integer auction_id) {
        this.auction_id = auction_id;
    }

    @Column(name="message_time")
    private String messageTime;

    public String getMessageTime() {
        return messageTime;
    }

    public void setMessageTime(String messageTime) {
        this.messageTime = messageTime;
    }

    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
