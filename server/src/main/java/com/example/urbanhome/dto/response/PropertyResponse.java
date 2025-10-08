package com.example.urbanhome.dto.response;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyResponse {
    private Long id;
    private String title;
    private String description;
    private PropertyType type;
    private double rating;
    private Location location;
    private Price price;
    private List<String> features;
    private List<String> restrictions;
    private List<String> media;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Price {
        private double amount;
        private String type; // rent/sale
        private String frequency; // monthly, yearly, etc. Only for rent
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Location {
        private String state;
        private String city;
        private String pincode;
        private String locality;
        private String landmark;
        private String address;
    }

    private Owner owner;

    @Data
    @Builder
    public static class Owner {
        private String name;
        private String phone;
        private String email;
    }

    public enum PropertyType {
        PG, FLAT, APARTMENT, HOUSE
    }
}
