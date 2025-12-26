package com.company.erp.dto;

import com.company.erp.domain.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter @Setter
public class UserSignupRequest {
    private String id;
    private String empName;
    private String email;
    private String pw;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birth;  // String으로 받아서 자동으로 Date로 변환

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private User.Gender gender;  // String으로 받아서 자동으로 Enum으로 변환

    private String tel;
    private String addr;
    private String position;
    private String job;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date start_date;

    private String workType;
    private Integer approval;
    private Boolean isActive;

}
