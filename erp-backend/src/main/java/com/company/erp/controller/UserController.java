package com.company.erp.controller;

import com.company.erp.domain.User;
import com.company.erp.dto.LoginRequest;
import com.company.erp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;


import com.company.erp.dto.UserSignupRequest;

@RestController
@RequiredArgsConstructor // 이걸 붙이면 생성자를 따로 안 써도 빈 주입
@RequestMapping("/api/employees")
public class UserController {
    private final UserService service;

    @PostMapping("/signUp")
    public User addEmployee(@RequestBody UserSignupRequest dto) {
        return service.signUp(dto);
    }
    @GetMapping("/checkId/{id}")
    public ResponseEntity<Map<String, Object>> checkId(@PathVariable String id) {
        boolean exists = service.existsById(id);

        Map<String, Object> response = new HashMap<>();
        response.put("available", !exists); // exists가 false면 사용 가능

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginRequest request,
            HttpServletResponse httpResponse) {
        try {
            // Service에서 User와 Token을 함께 받음
            Map<String, Object> loginResult = service.login(request.getId(), request.getPw());

            Map<String, Object> response = new HashMap<>();

            if (loginResult != null) {
                User user = (User) loginResult.get("user");
                String token = (String) loginResult.get("token");

                // httpOnly Cookie로 토큰 설정
                // ✅ ResponseCookie 사용 (SameSite 자동 포함)
                ResponseCookie cookie = ResponseCookie.from("auth_token", token)
                        .httpOnly(true)
                        .secure(false) // 개발: false, 프로덕션: true
                        .path("/")
                        .maxAge(86400) // 24시간
                        .sameSite("Strict") // CSRF 방지
                        .build();

                response.put("success", true);

                // 사용자 정보
                Map<String, Object> userInfo = new HashMap<>();
                userInfo.put("id", user.getId());
                userInfo.put("empName", user.getEmpName());
                userInfo.put("email", user.getEmail());
                userInfo.put("position", user.getPosition());
                userInfo.put("job", user.getJob());
                // 필요한 필드 더 추가 해야됨
                // userInfo.put("tel", user.getTel());
                // userInfo.put("birth", user.getBirth());
                // userInfo.put("gender", user.getGender());

                // 응답에서 token 제거 (보안 - Cookie에만 저장)
                response.put("user", userInfo);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "ID 또는 비밀번호가 올바르지 않습니다.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "로그인 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
