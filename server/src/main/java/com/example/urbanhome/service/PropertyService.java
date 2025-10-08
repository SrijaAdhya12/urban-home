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

        // if (property.getLocation() == null)
        //     property.setLocation(propertyDetails.getLocation());
        // else {
        //     property.getLocation().setState(propertyDetails.getLocation().getState());
        //     property.getLocation().setCity(propertyDetails.getLocation().getCity());
        //     property.getLocation().setPincode(propertyDetails.getLocation().getPincode());
        //     property.getLocation().setLocality(propertyDetails.getLocation().getLocality());
        //     property.getLocation().setLandmark(propertyDetails.getLocation().getLandmark());
        //     property.getLocation().setAddress(propertyDetails.getLocation().getAddress());
        // }

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

    // Search filters (using location object)
    public Page<Property> getPropertiesByCity(String city, Pageable pageable) {
        return propertyRepository.findByCityIgnoreCase(city, pageable);
    }

    public Page<Property> getPropertiesByState(String state, Pageable pageable) {
        return propertyRepository.findByStateIgnoreCase(state, pageable);
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

    // Combined filters
    public Page<Property> getPropertiesWithFilters(
            String city,
            String state,
            Double minPrice,
            Double maxPrice,
            PropertyType type,
            Double rating,
            LocalDateTime startDate,
            LocalDateTime endDate,
            Pageable pageable) {
        if (city != null && !city.isEmpty())
            return getPropertiesByCity(city, pageable);
        if (state != null && !state.isEmpty())
            return getPropertiesByState(state, pageable);
        if (minPrice != null && maxPrice != null)
            return getPropertiesByPriceRange(minPrice, maxPrice, pageable);
        if (type != null)
            return getPropertiesByType(type, pageable);
        if (rating != null)
            return getPropertiesByRating(rating, pageable);
        if (startDate != null && endDate != null)
            return getPropertiesByDateRange(startDate, endDate, pageable);

        return getAllProperties(pageable);
    }

}
