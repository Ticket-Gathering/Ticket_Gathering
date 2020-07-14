package com.example.ticket.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "perform")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "showId")
public class show {
    @Id
    @Column(name = "id")
    private int showId;

    private String name;
    private int category;
    private int sub_category;
    private String artists;
    private String show_time;
    private int venue_id;
    private int is_eticket;
    private int is_general_agent;
    private int is_xuanzuo;
    private Double price_low;
    private Double price_high;
    private int show_status;
    private String img_url;
    private String platform;
}
