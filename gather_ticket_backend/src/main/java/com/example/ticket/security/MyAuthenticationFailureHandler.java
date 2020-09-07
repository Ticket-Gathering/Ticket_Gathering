package com.example.ticket.security;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component("MyAuthenticationFailureHandler")
public class MyAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        logger.info("登录失败");
        logger.info(exception.getClass());
        response.setStatus(401); // 403 普通用户访问管理员页面
        response.setContentType("application/json;charset=UTF-8");
        if(exception.getClass() == BadCredentialsException.class || exception.getClass() == InternalAuthenticationServiceException.class){
            response.getWriter().append("{\"code\":1,\"msg\":\"登录失败!\",\"data\":\"failed\"}");
        } else if(exception.getClass() == DisabledException.class){
            response.getWriter().append("{\"code\":2,\"msg\":\"登录失败!\",\"data\":\"failed\"}");
        }

    }
}
