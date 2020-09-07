package com.example.ticket.security;

import com.example.ticket.entity.ClientAuth;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserDetailsPrincipal implements UserDetails {
    private final ClientAuth client;

    public UserDetailsPrincipal(ClientAuth client) {
        this.client = client;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return client.getUserType() == 1 || client.getUserType() == 0;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + (client.getUserType() == 0? "ADMIN":"USER")));
        return authorities;
    }

    @Override
    public String getPassword() {
        return client.getPassword();
    }

    @Override
    public String getUsername() {
        return client.getUsername();
    }

    public Integer getUserId(){
        return client.getUserId();
    }

    public Integer getUserType(){
        return client.getUserType();
    }
}
