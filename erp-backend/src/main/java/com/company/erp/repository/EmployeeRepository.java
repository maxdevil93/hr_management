package com.company.erp.repository;

import com.company.erp.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // 기본 CRUD 제공, 필요시 커스텀 메서드 추가 가능
}
