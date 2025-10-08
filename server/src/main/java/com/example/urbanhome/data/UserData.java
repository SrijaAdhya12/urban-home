package com.example.urbanhome.data;

import com.example.urbanhome.entity.User;

import java.util.List;

public class UserData {

    public static final List<User> USERS = List.of(
            User.builder()
                    .id(1L)
                    .firstName("Rahul")
                    .lastName("Sharma")
                    .email("rahul.sharma@example.com")
                    .phoneNumber("9876543210")
                    .password("dummy123")
                    .role("USER")
                    .build(),

            User.builder()
                    .id(2L)
                    .firstName("Anita")
                    .lastName("Reddy")
                    .email("anita.reddy@example.com")
                    .phoneNumber("9123456780")
                    .password("dummy123")
                    .role("USER")
                    .build(),

            User.builder()
                    .id(3L)
                    .firstName("Vikram")
                    .lastName("Patel")
                    .email("vikram.patel@example.com")
                    .phoneNumber("9988776655")
                    .password("dummy123")
                    .role("USER")
                    .build(),

            User.builder()
                    .id(4L)
                    .firstName("Sonal")
                    .lastName("Deshmukh")
                    .email("sonal.deshmukh@example.com")
                    .phoneNumber("9876541230")
                    .password("dummy123")
                    .role("USER")
                    .build(),

            User.builder()
                    .id(5L)
                    .firstName("Rajiv")
                    .lastName("Khanna")
                    .email("rajiv.khanna@example.com")
                    .phoneNumber("9123456789")
                    .password("dummy123")
                    .role("USER")
                    .build()
    );
}
