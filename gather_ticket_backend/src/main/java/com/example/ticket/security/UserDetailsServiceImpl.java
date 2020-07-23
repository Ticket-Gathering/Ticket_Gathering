package com.example.ticket.security;

import com.example.ticket.entity.ClientAuth;
import com.example.ticket.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserAuthRepository userAuthRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        List<GrantedAuthority> authorities=new ArrayList<>();
//        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        ClientAuth client = userAuthRepository.getUserAuthByUsername(username);
        if(client==null){
            return  null;
        }
        //根据id来查询用户名
        return new UserDetailsPrincipal(client);


//        return new User(username, client.getPassword(), authorities);
    }
}
