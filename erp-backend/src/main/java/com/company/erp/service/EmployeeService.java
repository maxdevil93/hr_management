package com.company.erp.service;

import com.company.erp.domain.User;
import com.company.erp.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeeService {
    private final UserRepository repository;

    public EmployeeService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> getAllEmployees() {
        return repository.findAll();
    }

    public User saveEmployee(User user) {
        return repository.save(user);
    }
}
