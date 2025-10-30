package com.security.autenticationMfa.Services;

import java.util.List;


import com.security.autenticationMfa.Models.User;

public interface UserService {
    User createUser(User user);
    User getUserById(Long id);
    List<User> getAllUsers();
    User updateUser(Long id, User user);
    void deleteUser(Long id);
}
