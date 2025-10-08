package com.example.urbanhome.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.example.urbanhome.entity.Property;
import com.example.urbanhome.entity.Property.PropertyType;
import com.example.urbanhome.entity.Property.RentType;

import lombok.Data;



@Data
public class PropertiesDto {

    // thumbnail, type, rating, title, state, city, locality, date added, rentAmount, rentType, features


    private Long id;
    private String thumbnail;
    private PropertyType type;
    private Double rating;
    private String title;
    private String state;
    private String city;
    private  String locality;
    private LocalDateTime dateAdded;
    private Double rentAmount;
    private RentType rentType;
    private List<String> features;


    public PropertiesDto(Property property) {
        this.id = property.getId();
        this.thumbnail = property.getMedia().getFirst();
        this.type = property.getType();
        this.rating = property.getRating();
        this.title = property.getTitle();
        this.state = property.getState();
        this.city = property.getCity();
        this.locality = property.getLocality();
        this.dateAdded = property.getDateAdded();
        this.rentAmount = property.getRentAmount();
        this.rentType = property.getRentType();
        this.features = property.getFeatures();


    }
    


}
