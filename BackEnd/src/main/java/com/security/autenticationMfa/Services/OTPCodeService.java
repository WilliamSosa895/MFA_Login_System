package com.security.autenticationMfa.Services;

import com.security.autenticationMfa.Models.User;

public interface OTPCodeService {
    void createAndSendOTP(User user, String device);
    boolean validateOTPCode(User user, int code);
}