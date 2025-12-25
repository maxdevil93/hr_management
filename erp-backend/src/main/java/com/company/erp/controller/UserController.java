package com.company.erp.controller;

import com.company.erp.domain.User;
import com.company.erp.service.userService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.company.erp.dto.userSignupRequest;

@RestController
@RequiredArgsConstructor // 이걸 붙이면 생성자를 따로 안 써도 빈 주입
@RequestMapping("/api/employees")
public class UserController {
    private final userService service;

    @PostMapping("/signUp")
    public User addEmployee(@RequestBody userSignupRequest dto) {
        return service.signUp(dto);
    }
}
