package com.company.erp.service;

import com.company.erp.domain.User;
import com.company.erp.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.company.erp.dto.userSignupRequest;
import com.company.erp.repository.UserRepository;
import lombok.RequiredArgsConstructor; // 생성자 주입을 편하게 해줌
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor // 이걸 붙이면 생성자를 따로 안 써도 빈 주입
public class userService {
    private final UserRepository userRepository; // 변수명 통일
    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public User signUp(userSignupRequest dto) {
        // 1. 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(dto.getPw());

        // 2. 빌더 패턴으로 엔티티 생성
        User user = User.builder()
                .email(dto.getEmail())
                .pw(encodedPassword)
                .empName(dto.getEmpName())
                .tel(dto.getTel())
                .birth(dto.getBirth())
                .gender(dto.getGender())
                .addr(dto.getAddr())
                .position(dto.getPosition())
                .job(dto.getJob())
                .start_date(dto.getStart_date())
                .workType(dto.getWorkType())
                .approval(dto.getApproval())
                .isActive(true)
                .build();

        return userRepository.save(user);
    }
}
