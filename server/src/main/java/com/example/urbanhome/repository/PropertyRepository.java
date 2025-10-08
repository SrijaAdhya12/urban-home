package com.example.urbanhome.repository;

import com.example.urbanhome.entity.Property;
import com.example.urbanhome.entity.Property.PropertyType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    // Nested location queries
    Page<Property> findByCityIgnoreCase(String city, Pageable pageable);

    Page<Property> findByStateIgnoreCase(String state, Pageable pageable);

    // Other filters
    Page<Property> findByType(PropertyType type, Pageable pageable);

    Page<Property> findByRentAmountBetween(double min, double max, Pageable pageable);

    Page<Property> findByRatingGreaterThanEqual(double rating, Pageable pageable);

    Page<Property> findByDateAddedBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
}
