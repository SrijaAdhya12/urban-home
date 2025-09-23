package com.example.urbanhome.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Name fields
    @Column(nullable = false)
    private String firstName;

    private String middleName;

    @Column(nullable = false)
    private String lastName;

    // Contact
    @Column(unique = true, nullable = false)
    private String phoneNumber;

    @Column(unique = true, nullable = false)
    private String email;

    // Authentication
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role = "USER"; // USER or ADMIN

    // Profile & Address
    private String profilePicture; // URL/path
    private String address;

    // Dates
    private LocalDateTime dateJoined = LocalDateTime.now();

    // Relationships
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Property> properties; // Properties listed by user
}
