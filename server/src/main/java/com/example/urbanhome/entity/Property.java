package com.example.urbanhome.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "properties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyType type; // PG, Flat, Apartment, House

    // Location fields
    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String city;

    private String pincode;
    private String locality;
    private String landmark;
    private String address;

    // Owner
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    // Rent
    @Column(nullable = false)
    private double rentAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RentType rentType; // MONTHLY, QUARTERLY, YEARLY

    // Features & restrictions
    @ElementCollection
    private List<String> features;

    @ElementCollection
    private List<String> restrictions;

    // Media
    @ElementCollection
    private List<String> media;

    // Rating
    private double rating;

    // Dates
    private LocalDateTime dateAdded = LocalDateTime.now();
    private LocalDateTime dateModified = LocalDateTime.now();

    // Enums
    public enum PropertyType {
        PG, FLAT, APARTMENT, HOUSE
    }

    public enum RentType {
        MONTHLY, QUARTERLY, YEARLY
    }
}
