package com.example.ticket.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "perform")
@IdClass(ShowKey.class)
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "showId")
public class Show {
    @Id
    @Column(name = "id")
    private String showId;

    @Id
    @Column(name="platform")
    private String platform;

    private String name;
    private int sub_category;
    private String artists;
    private String show_time;
    private int is_eticket;
    private int is_general_agent;
    private int is_xuanzuo;
    private Double price_low;
    private Double price_high;
    private int show_status;
    private String img_url;
    private String city;

    @OneToOne(fetch=FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name="venue_id",referencedColumnName="id",nullable=false)
    private Venue venue;

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH}, optional=false, fetch=FetchType.LAZY)
    @JoinColumn(name="category",referencedColumnName="id",nullable=false)
    private Category category;


    public String getName()
    {
        return name;
    }
}
