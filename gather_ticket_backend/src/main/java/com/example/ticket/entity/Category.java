package com.example.ticket.entity;


import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.context.annotation.Lazy;


import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "category")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "categoryId")
public class Category {
    @Id
    @Column(name = "id")
    private int categoryId;

    @Column(name="category")
    private String category;

    public Integer getCategoryId()
    {
        return categoryId;
    }

    @OneToMany(mappedBy="category",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JSONField(serialize = false)
    private List<Show> showList;
}
