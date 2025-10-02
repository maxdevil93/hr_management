package com.company.erp.controller;

import com.company.erp.domain.Employee;
import com.company.erp.service.EmployeeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Employee> getEmployees() {
        return service.getAllEmployees();
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return service.saveEmployee(employee);
    }
}
