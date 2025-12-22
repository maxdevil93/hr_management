package com.company.erp.domain;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;


@Entity
@Table(name = "user")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    // ENUM이 효율적임
    public enum Gender {
        MALE, FEMALE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // String -> Long

    @Column(nullable = false, length = 200)
    private String pw;

    private Date birth;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Gender gender; // Enum으로 변경

    @Column(length = 20)
    private String tel;

    @Column(length = 255)
    private String addr;

    @Column(length = 20)
    private String position;

    @Column(length = 20)
    private String job;

    @Column(length = 20)
    private String status;

    // 카멜케이스해야되나 고민중
    private Date start_date;

    private Date quit_date;

    @Column(length = 100)
    private String email;

    @Column(length = 20)
    private String workType;

    private Integer approval;

    @Column(length = 50) // 이름 넉넉하게
    private String empName;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Column(columnDefinition = "TINYINT(1)")
    private Boolean isActive;

}
