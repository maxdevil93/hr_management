package com.company.erp.repository;

import com.company.erp.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    // 이메일로 중복 가입 확인이나 로그인을 하기 위해 조회 기능
//    Optional<User> findByEmail(String email);


}
