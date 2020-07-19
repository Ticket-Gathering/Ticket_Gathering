package com.example.ticket.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "operation_log")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "logId")
public class OperationLog {
    private int logId;
    private int adminId;
    private String operation;
    private Date timestamp;

    @Id
    @Column(name = "log_id")
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    public int getLogId() {return this.logId;}

    public void setLogId(int logId) {
        this.logId = logId;
    }

    @Basic
    @Column(name = "admin_id")
    public int getAdminId() { return this.adminId;}

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    @Basic
    @Column(name = "operation")
    public String getOperation() {return this.operation;}

    public void setOperation(String operation) {
        this.operation = operation;
    }

    @Basic
    @Column(name = "timestamp")
    public Date getTimestamp() { return this.timestamp;}

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
