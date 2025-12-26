package com.company.erp.service;

import com.company.erp.domain.User;
import com.company.erp.repository.UserRepository;
import com.company.erp.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.company.erp.dto.UserSignupRequest;
import lombok.RequiredArgsConstructor; // 생성자 주입을 편하게 해줌
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor // 이걸 붙이면 생성자를 따로 안 써도 빈 주입
public class UserService {
    private final UserRepository userRepository; // 변수명 통일
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil; // JWT 유틸 주입


    @Transactional
    public User signUp(UserSignupRequest dto) {
        // 1. 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(dto.getPw());

        // 2. 빌더 패턴으로 엔티티 생성
        User user = User.builder()
                .id(dto.getId())
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

    // ID 중복 확인 메서드
    public boolean existsById(String id) {
        return userRepository.existsById(id);
    }

    public Map<String, Object> login(String id, String pw) {
        // 1. ID로 사용자 조회
        Optional<User> userOpt = userRepository.findById(id);

        if (userOpt.isEmpty()) {
            return null; // ID 없음
        }

        User user = userOpt.get();

        // 2. 계정 활성화 여부 확인
        if (user.getIsActive() == null || !user.getIsActive()) {
            throw new RuntimeException("비활성화된 계정입니다.");
        }

        // 3. 비밀번호 검증
        if (!passwordEncoder.matches(pw, user.getPw())) {
            return null; // 비밀번호 불일치
        }

        // 4. JWT 토큰 생성
        String token = jwtUtil.generateToken(user.getId(), user.getEmpName());

        // 5. User와 Token을 함께 반환
        Map<String, Object> result = new HashMap<>();
        result.put("user", user);
        result.put("token", token);

        return result;
    }

}
