package com.company.erp.controller;

import com.company.erp.domain.User;
import com.company.erp.service.EmployeeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class UserController {
    private final EmployeeService service;

    public UserController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getEmployees() {
        return service.getAllEmployees();
    }

    @PostMapping
    public User addEmployee(@RequestBody User user) {
        return service.saveEmployee(user);
    }
}
