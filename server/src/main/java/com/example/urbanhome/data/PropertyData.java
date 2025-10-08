package com.example.urbanhome.data;

import com.example.urbanhome.entity.Property;
import com.example.urbanhome.entity.Property.PropertyType;
import com.example.urbanhome.entity.Property.RentType;

import java.time.LocalDateTime;
import java.util.List;

public class PropertyData {

    public static final List<Property> PROPERTIES = List.of(
            Property.builder()
                    .id(1L)
                    .title("Cozy Apartment in Bangalore")
                    .description("2BHK with balcony and parking near MG Road.")
                    .type(PropertyType.APARTMENT)
                    .state("Karnataka")
                    .city("Bangalore")
                    .pincode("560001")
                    .locality("MG Road")
                    .landmark("Metro Station")
                    .address("12/4 MG Road, Bangalore")
                    .owner(UserData.USERS.get(0))
                    .rentAmount(18000)
                    .rentType(RentType.MONTHLY)
                    .features(List.of("Pet Friendly", "Gated Community", "Power Backup"))
                    .restrictions(List.of("No Smoking", "No Pets"))
                    .media(List.of(
                            "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
                            "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"))
                    .rating(4.5)
                    .dateAdded(LocalDateTime.now().minusDays(2))
                    .dateModified(LocalDateTime.now())
                    .build(),

            Property.builder()
                    .id(2L)
                    .title("Luxury Villa in Hyderabad")
                    .description("4BHK Villa with pool and garden.")
                    .type(PropertyType.HOUSE)
                    .state("Telangana")
                    .city("Hyderabad")
                    .pincode("500081")
                    .locality("Gachibowli")
                    .landmark("Wipro Circle")
                    .address("Plot 21, Green Valley, Gachibowli")
                    .owner(UserData.USERS.get(1))
                    .rentAmount(12000000)
                    .rentType(RentType.YEARLY)
                    .features(List.of("Swimming Pool", "Gym", "Garden"))
                    .restrictions(List.of("No Pets"))
                    .media(List.of(
                            "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
                            "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"))
                    .rating(4.8)
                    .dateAdded(LocalDateTime.now().minusDays(5))
                    .dateModified(LocalDateTime.now())
                    .build(),

            Property.builder()
                    .id(3L)
                    .title("Modern Studio in Mumbai")
                    .description("1BHK fully furnished studio near Andheri West.")
                    .type(PropertyType.FLAT)
                    .state("Maharashtra")
                    .city("Mumbai")
                    .pincode("400053")
                    .locality("Andheri West")
                    .landmark("Metro Station")
                    .address("Flat 203, Orchid Apartments, Andheri West")
                    .owner(UserData.USERS.get(2))
                    .rentAmount(25000)
                    .rentType(RentType.MONTHLY)
                    .features(List.of("Furnished", "WiFi", "24/7 Security"))
                    .restrictions(List.of("No Pets"))
                    .media(List.of(
                            "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
                            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"))
                    .rating(4.2)
                    .dateAdded(LocalDateTime.now().minusDays(3))
                    .dateModified(LocalDateTime.now())
                    .build(),

            Property.builder()
                    .id(4L)
                    .title("PG Accommodation in Pune")
                    .description("Single occupancy PG near Hinjewadi IT Park.")
                    .type(PropertyType.PG)
                    .state("Maharashtra")
                    .city("Pune")
                    .pincode("411057")
                    .locality("Hinjewadi")
                    .landmark("Wipro Campus")
                    .address("Room 12, Sunrise PG, Hinjewadi")
                    .owner(UserData.USERS.get(3))
                    .rentAmount(8000)
                    .rentType(RentType.MONTHLY)
                    .features(List.of("Meals Included", "WiFi", "Laundry"))
                    .restrictions(List.of("No Smoking"))
                    .media(List.of(
                            "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
                            "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"))
                    .rating(4.0)
                    .dateAdded(LocalDateTime.now().minusDays(1))
                    .dateModified(LocalDateTime.now())
                    .build(),

            Property.builder()
                    .id(5L)
                    .title("Spacious House in Delhi")
                    .description("5BHK independent house with garden and parking.")
                    .type(PropertyType.HOUSE)
                    .state("Delhi")
                    .city("New Delhi")
                    .pincode("110001")
                    .locality("Chanakyapuri")
                    .landmark("Embassy Area")
                    .address("Plot 5, Green Enclave, Chanakyapuri")
                    .owner(UserData.USERS.get(4))
                    .rentAmount(18000)
                    .rentType(RentType.YEARLY)
                    .features(List.of("Garden", "Parking", "Servant Room"))
                    .restrictions(List.of("No Pets"))
                    .media(List.of(
                            "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
                            "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"))
                    .rating(4.7)
                    .dateAdded(LocalDateTime.now().minusDays(4))
                    .dateModified(LocalDateTime.now())
                    .build()
    );
}
