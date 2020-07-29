package com.example.ticket.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final MyAuthenticationSuccessHandler myAuthenticationSuccessHandler;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsServiceImpl userService;

    public WebSecurityConfig(MyAuthenticationSuccessHandler myAuthenticationSuccessHandler) {
        this.myAuthenticationSuccessHandler = myAuthenticationSuccessHandler;
    }

    //    @Autowired
//    private AuthenticationFailureHandler xiangXuAuthenticationFailureHandler;
//
//    @Autowired
//    private AuthenticationSuccessHandler xiangXuAuthenticationSuccessHandler;
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider
                = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .formLogin()
                .loginProcessingUrl("/login") // 提交登录信息的API
                .usernameParameter("username") // 登录名
                .passwordParameter("password") // 登录密码
                .and().authorizeRequests()
                .antMatchers("/show/**").permitAll() // 访问演出页面不需要授权
                .antMatchers("/addUser").permitAll()    // 注册用户不需要授权
                .antMatchers("/login").permitAll()  // 登录页面不需要授权
                .antMatchers("/actuator/**").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")  // 只有管理员能够编写日志
                .anyRequest().authenticated() // 剩余都需要授权
                .and()
                .logout().permitAll() // 登出API不需要授权
                .and()
                .cors()
                .and()
                .csrf().disable();
        http.addFilterAt(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * 創建PsswordEncoder對應的Bean
     * @return
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 创建认证提供者Bean
     * 技巧01：DaoAuthenticationProvider是SpringSecurity提供的AuthenticationProvider实现类
     * @return
     */
//    @Bean
//    public DaoAuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider authProvider
//                = new DaoAuthenticationProvider(); // 创建DaoAuthenticationProvider实例
//        authProvider.setUserDetailsService(userService); // 将自定义的认证逻辑添加到DaoAuthenticationProvider
//        authProvider.setPasswordEncoder(passwordEncoder); // 设置自定义的密码加密
//        return authProvider;
//    }

    @Bean
    CustomAuthenticationFilter customAuthenticationFilter() throws Exception{
        CustomAuthenticationFilter filter = new CustomAuthenticationFilter();
        filter.setAuthenticationSuccessHandler(new MyAuthenticationSuccessHandler());
        filter.setAuthenticationFailureHandler(new MyAuthenticationFailureHandler());
        filter.setAuthenticationManager(authenticationManagerBean());
        return filter;
    }
}
