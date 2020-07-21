package com.example.ticket.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;
import java.util.List;

@Document(collection = "ticketdetail")
public class ShowDetail {
   @Id
   @Field("id")
   private String id;

   private  String detail;
   private List<String> images;
   private List<String> prices;
   private List<String> times;
   private String notice0;
   private String notice1;

   public String getId()
   {
      return id;
   }

   public void setId(String id){
      this.id=id;
   }

   public String getDetail(){
      return detail;
   }

   public void setDetail(String detail){
      this.detail=detail;
   }

   public String getNotice0(){
      return notice0;
   }

   public void setNotice0(String notice0){
      this.notice0=notice0;
   }

   public String getNotice1(){
      return notice1;
   }

   public void setNotice1(String notice1){
      this.notice1=notice1;
   }

   public List<String> getImages(){
      return images;
   }

   public void setImages(List<String> images){
      this.images.addAll(images);
   }

   public List<String> getPrices(){
      return prices;
   }

   public void setPrices(List<String> prices){
      this.prices.addAll(prices);
   }

   public List<String> getTimes(){
      return times;
   }

   public void setTimes(List<String> times){
      this.times.addAll(times);
   }

   private Show show;
   public Show getShow(){
      return show;
   }

   public void setShow(Show show){
      this.show=show;
   }
}
