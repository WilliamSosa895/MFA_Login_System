package com.security.autenticationMfa.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.security.autenticationMfa.Models.User;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByEmail(String email);
} 
