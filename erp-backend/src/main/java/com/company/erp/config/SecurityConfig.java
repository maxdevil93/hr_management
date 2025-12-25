package com.company.erp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration      // 1. 설정 클래스임을 명시
@EnableWebSecurity  // 2. 보안 스위치 ON (보안 필터 가동)
public class SecurityConfig {

    @Bean // 검문소에서 쓸 도구(암호화기)를 등록
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean // 구체적인 검문 규칙(어디를 막고 열지)을 설정
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // API 방식이므로 CSRF 비활성화 로그인/가입은 통과!
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // 우선 모두 허용 나머지는 신분증(로그인) 필요!
                                                                                // 현재는 개발 단계라 모든 요청을 허용함
        return http.build();
    }
}
