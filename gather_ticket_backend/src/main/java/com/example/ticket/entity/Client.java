package com.example.ticket.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "clients")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "userId")
public class Client {

    private int userId;

    private String name;
    private String nickname;
    private String tel;
    private String email;
    private int gender;
    private String IdNum;

//    @JsonFormat(pattern = "yyyy-MM-dd", timezone="GMT+8")
//    @DateTimeFormat(pattern = "yyyy-MM-dd" )
    private Date birth;

    @Id
    @Column(name = "user_id")
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public int getUserId() { return userId; }

    public void setUserId(int userId) { this.userId = userId; }

    @Basic
    @Column(name = "name")
    public String getName() {return  name;}

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "nickname")
    public String getNickname() {return nickname;}

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Basic
    @Column(name = "id_num")
    public String getIdNum() {return IdNum;}

    public void setIdNum(String  IdNum) {
        this.IdNum = IdNum;
    }

    @Basic
    @Column(name = "tel")
    public String getTel() {return tel;}

    public void setTel(String tel) {
        this.tel = tel;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {return email;}

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "birth")
    public Date getBirth() {return birth;}
    public void setBirth(Date birth) {
        this.birth = birth;
    }

    @Basic
    @Column(name = "gender")
    public int getGender() {return gender;}

    public void setGender(int gender) {
        this.gender = gender;
    }

    private List<Receiver> receiverList;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<Receiver> getReceiverList() { return this.receiverList;}

    public void setReceiverList(List<Receiver> receiverList) {
        this.receiverList = receiverList;
    }

    private List<TicketHolder> ticketHolderList;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<TicketHolder> getTicketHolderList() { return this.ticketHolderList;}

    public void setTicketHolderList(List<TicketHolder> ticketHolderList) {
        this.ticketHolderList = ticketHolderList;
    }

    @Column(name= "message_checked")
    private Integer messageChecked;

    public Integer getMessageChecked() {
        return messageChecked;
    }

    public void setMessageChecked(Integer messageChecked) {
        this.messageChecked = messageChecked;
    }
}


