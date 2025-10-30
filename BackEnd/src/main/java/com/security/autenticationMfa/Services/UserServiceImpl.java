package com.security.autenticationMfa.Services;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.security.autenticationMfa.Models.User;
import com.security.autenticationMfa.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(User user) {
        // Asignar valores por defecto
        if (user.getCreated_at() == null) {
            user.setCreated_at(new Timestamp(System.currentTimeMillis()));
        }
        if (user.getIs_enabled() == null) {
            user.setIs_enabled(true);
        }
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(Long id, User user) {
        return userRepository.findById(id).map(existing -> {
            existing.setFirst_name(user.getFirst_name());
            existing.setLast_name(user.getLast_name());
            existing.setEmail(user.getEmail());
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                existing.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            if (user.getIs_enabled() != null) {
                existing.setIs_enabled(user.getIs_enabled());
            }
            return userRepository.save(existing);
        }).orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
