package com.example.urbanhome.service;

import com.example.urbanhome.data.PropertyData;
import com.example.urbanhome.dto.PropertiesDto;
import com.example.urbanhome.entity.Property;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PropertyServiceMock {

    private final List<Property> properties = PropertyData.PROPERTIES;

    public List<PropertiesDto> getAllProperties() {
        return properties.stream().map(PropertiesDto::new).collect(Collectors.toList());
    }

    public Optional<Property> getPropertyById(Long id) {
        return properties.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }
}
