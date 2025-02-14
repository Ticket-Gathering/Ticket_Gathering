package com.example.ticket.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.CriteriaBuilder;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component("MyAuthenticationSuccessHandler")
public class MyAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException, IOException {
        String currentUser = authentication.getName();
        UserDetailsPrincipal principal = (UserDetailsPrincipal)authentication.getPrincipal();
        Integer userId = principal.getUserId();
        String username = principal.getUsername();
        Integer userType = principal.getUserType();
        logger.info("用户"+currentUser+"登录成功");
        response.setStatus(200);
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().append("{\"code\":0,\"msg\":\"登录成功!\",\"data\":\"success\",\"userId\":")
                .append(String.valueOf(userId))
                .append(",\"username\":\"")
                .append(username)
                .append("\",\"userType\":")
                .append(String.valueOf(userType))
                .append("}");
    }
}
