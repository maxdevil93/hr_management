package com.company.erp.repository;

import com.company.erp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // 회원가입시 ID중복 조회
    boolean existsById(String id);  // ✅ Spring이 자동으로 해석

    // 로그인용: ID로 사용자 조회
    Optional<User> findById(String id);
}
