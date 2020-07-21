package com.example.ticket.entity;

import java.io.Serializable;

public class ShowKey implements Serializable {
    private String showId;
    private String platform;


    public ShowKey() {

    }

    public ShowKey(String showId, String platform) {
        this.platform = platform;
        this.showId = showId;

    }

    public String getShowId() {
        return this.showId;
    }

    public void setShowId(String showId) {
        this.showId = showId;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }
}
