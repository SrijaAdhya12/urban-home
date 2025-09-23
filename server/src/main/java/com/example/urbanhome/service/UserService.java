package com.example.urbanhome.service;

import com.example.urbanhome.entity.User;
import com.example.urbanhome.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Register a new user
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            throw new RuntimeException("Phone number already exists");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setDateJoined(LocalDateTime.now());
        user.setRole(user.getRole() == null ? "USER" : user.getRole());
        return userRepository.save(user);
    }

    // Find by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Find by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Find by phone number
    public Optional<User> findByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    // Update user profile
    public User updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(updatedUser.getFirstName());
        user.setMiddleName(updatedUser.getMiddleName());
        user.setLastName(updatedUser.getLastName());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        user.setEmail(updatedUser.getEmail());
        user.setProfilePicture(updatedUser.getProfilePicture());
        user.setAddress(updatedUser.getAddress());

        return userRepository.save(user);
    }
}
