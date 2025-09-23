package com.example.urbanhome.service;

import com.example.urbanhome.entity.Property;
import com.example.urbanhome.entity.Property.PropertyType;
import com.example.urbanhome.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;

    // Create property
    public Property createProperty(Property property) {
        property.setDateAdded(LocalDateTime.now());
        property.setDateModified(LocalDateTime.now());
        return propertyRepository.save(property);
    }

    // Update property
    public Property updateProperty(Long id, Property propertyDetails) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        property.setTitle(propertyDetails.getTitle());
        property.setDescription(propertyDetails.getDescription());
        property.setType(propertyDetails.getType());
        property.setState(propertyDetails.getState());
        property.setCity(propertyDetails.getCity());
        property.setPincode(propertyDetails.getPincode());
        property.setLocality(propertyDetails.getLocality());
        property.setLandmark(propertyDetails.getLandmark());
        property.setAddress(propertyDetails.getAddress());
        property.setRentAmount(propertyDetails.getRentAmount());
        property.setRentType(propertyDetails.getRentType());
        property.setFeatures(propertyDetails.getFeatures());
        property.setRestrictions(propertyDetails.getRestrictions());
        property.setMedia(propertyDetails.getMedia());
        property.setRating(propertyDetails.getRating());
        property.setDateModified(LocalDateTime.now());

        return propertyRepository.save(property);
    }

    // Delete property
    public void deleteProperty(Long id) {
        if (!propertyRepository.existsById(id)) {
            throw new RuntimeException("Property not found");
        }
        propertyRepository.deleteById(id);
    }

    // Get all properties
    public Page<Property> getAllProperties(Pageable pageable) {
        return propertyRepository.findAll(pageable);
    }

    // Get property by ID
    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    // Search filters
    public Page<Property> getPropertiesByCity(String city, Pageable pageable) {
        return propertyRepository.findByCityIgnoreCase(city, pageable);
    }

    public Page<Property> getPropertiesByPriceRange(double minPrice, double maxPrice, Pageable pageable) {
        return propertyRepository.findByRentAmountBetween(minPrice, maxPrice, pageable);
    }

    public Page<Property> getPropertiesByType(PropertyType type, Pageable pageable) {
        return propertyRepository.findByType(type, pageable);
    }

    public Page<Property> getPropertiesByRating(double rating, Pageable pageable) {
        return propertyRepository.findByRatingGreaterThanEqual(rating, pageable);
    }

    public Page<Property> getPropertiesByDateRange(LocalDateTime start, LocalDateTime end, Pageable pageable) {
        return propertyRepository.findByDateAddedBetween(start, end, pageable);
    }

    public Page<Property> getPropertiesWithFilters(
            String city,
            String state,
            Double minPrice,
            Double maxPrice,
            PropertyType type,
            Double rating,
            LocalDateTime startDate,
            LocalDateTime endDate,
            Pageable pageable
    ) {
        // Apply filters one by one. You can extend with a more complex Specification/Criteria API later.

        if (city != null && !city.isEmpty()) {
            return getPropertiesByCity(city, pageable);
        }

        if (state != null && !state.isEmpty()) {
            return propertyRepository.findByStateIgnoreCase(state, pageable);
        }

        if (minPrice != null && maxPrice != null) {
            return getPropertiesByPriceRange(minPrice, maxPrice, pageable);
        }

        if (type != null) {
            return getPropertiesByType(type, pageable);
        }

        if (rating != null) {
            return getPropertiesByRating(rating, pageable);
        }

        if (startDate != null && endDate != null) {
            return getPropertiesByDateRange(startDate, endDate, pageable);
        }

        // If no filters, return all paginated
        return getAllProperties(pageable);
    }

}
