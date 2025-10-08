package com.example.urbanhome.controller;

import com.example.urbanhome.dto.PropertiesDto;
import com.example.urbanhome.entity.Property;
import com.example.urbanhome.entity.Property.PropertyType;
import com.example.urbanhome.service.PropertyService;
import com.example.urbanhome.service.PropertyServiceMock;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;
    private final PropertyServiceMock propertyServiceMock;

    @GetMapping("/mock")
    public List<PropertiesDto> getAllMockProperties() {
        return propertyServiceMock.getAllProperties();
    }

    @GetMapping("/mock/{id}")
    public Optional<Property> getMockPropertyById(@PathVariable Long id) {
        return propertyServiceMock.getPropertyById(id);
    }

    @GetMapping
    public Page<Property> getProperties(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) PropertyType type,
            @RequestParam(required = false) Double rating,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page // 0-indexed page number
    ) {
        Pageable pageable = PageRequest.of(page, 50); // 50 records per page

        return propertyService.getPropertiesWithFilters(city, state, minPrice, maxPrice, type, rating, startDate,
                endDate, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyService.createProperty(property);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        try {
            return ResponseEntity.ok(propertyService.updateProperty(id, property));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id) {
        try {
            propertyService.deleteProperty(id);
            return ResponseEntity.ok("Property deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
