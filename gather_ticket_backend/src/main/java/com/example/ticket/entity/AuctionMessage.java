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
    private Integer messageId;

    public Integer getMessageId() {
        return messageId;
    }
    public void setMessageId(Integer message_id) {
        this.messageId = message_id;
    }

    private Integer userId;

    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer user_id) {
        this.userId = user_id;
    }

    private Integer auctionId;

    public Integer getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Integer auction_id) {
        this.auctionId = auction_id;
    }

    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
