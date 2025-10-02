package com.company.erp.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    private String department;
    private String email;
}
