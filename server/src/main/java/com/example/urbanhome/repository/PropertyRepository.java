package com.example.urbanhome.repository;

import com.example.urbanhome.entity.Property;
import com.example.urbanhome.entity.Property.PropertyType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    @NonNull
    Page<Property> findAll(@NonNull Pageable pageable);
    // Search by city
    Page<Property> findByCityIgnoreCase(String city, Pageable pageable);

    // Search by state
    Page<Property> findByStateIgnoreCase(String state, Pageable pageable);

    // Search by price range
    Page<Property> findByRentAmountBetween(double minPrice, double maxPrice, Pageable pageable);

    // Search by property type
    Page<Property> findByType(PropertyType type, Pageable pageable);

    // Search by date added range
    Page<Property> findByDateAddedBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    // Search by rating greater than or equal to
    Page<Property> findByRatingGreaterThanEqual(double rating, Pageable pageable);

    // Combined search example (city + type + price range)
    Page<Property> findByCityIgnoreCaseAndTypeAndRentAmountBetween(
            String city, PropertyType type, double minPrice, double maxPrice, Pageable pageable
    );
}
