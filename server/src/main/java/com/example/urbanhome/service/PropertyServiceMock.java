package com.example.urbanhome.service;

import com.example.urbanhome.dto.PropertyResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PropertyServiceMock {

    private final List<PropertyResponse> properties;

    public PropertyServiceMock() {
        properties = List.of(
                PropertyResponse.builder()
                        .id(1L)
                        .title("Cozy Apartment in Bangalore")
                        .description("2BHK with balcony and parking near MG Road.")
                        .type(PropertyResponse.PropertyType.APARTMENT)
                        .rating(4.5)
                        .price(PropertyResponse.Price.builder()
                                .amount(18000)
                                .type("rent")
                                .frequency("monthly")
                                .build())
                        .location(PropertyResponse.Location.builder()
                                .state("Karnataka")
                                .city("Bangalore")
                                .pincode("560001")
                                .locality("MG Road")
                                .landmark("Metro Station")
                                .address("12/4 MG Road, Bangalore")
                                .build())
                        .features(List.of("Pet Friendly", "Gated Community", "Power Backup"))
                        .restrictions(List.of("No Smoking", "No Pets"))
                        .media(List.of(
                                "https://example.com/images/apt1.jpg",
                                "https://example.com/images/apt2.jpg"))
                        .dateAdded(LocalDateTime.now().minusDays(2))
                        .dateModified(LocalDateTime.now())
                        .build(),

                PropertyResponse.builder()
                        .id(2L)
                        .title("Luxury Villa in Hyderabad")
                        .description("4BHK Villa with pool and garden.")
                        .type(PropertyResponse.PropertyType.HOUSE)
                        .rating(4.8)
                        .price(PropertyResponse.Price.builder()
                                .amount(1_20_00_000)
                                .type("sale")
                                .build())
                        .location(PropertyResponse.Location.builder()
                                .state("Telangana")
                                .city("Hyderabad")
                                .pincode("500081")
                                .locality("Gachibowli")
                                .landmark("Wipro Circle")
                                .address("Plot 21, Green Valley, Gachibowli")
                                .build())
                        .features(List.of("Swimming Pool", "Gym", "Garden"))
                        .restrictions(List.of("No Pets"))
                        .media(List.of("https://example.com/images/villa.jpg"))
                        .dateAdded(LocalDateTime.now().minusDays(5))
                        .dateModified(LocalDateTime.now())
                        .build());
    }

    public List<PropertyResponse> getAllProperties() {
        return properties;
    }
}
