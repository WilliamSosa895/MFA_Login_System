package com.security.autenticationMfa.Services;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.security.autenticationMfa.Models.OTP_Code;
import com.security.autenticationMfa.Models.User;
import com.security.autenticationMfa.Repository.OTPCodeRepository;

@Service
public class OTPCodeServiceImpl implements OTPCodeService {

    @Autowired
    private OTPCodeRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public void createAndSendOTP(User user, String device) {
        int code = 100000 + new Random().nextInt(900000);
        OTP_Code otp = new OTP_Code();
        otp.setCode(code);
        otp.setUser(user);
        otp.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        otp.setExpiresAt(new Timestamp(System.currentTimeMillis() + 5 * 60_000));
        otp.setUsed(false);
        otp.setDevice(device);
        otpRepository.save(otp);
        emailService.sendOtpEmail(user.getEmail(), code);
    }

    @Override
    public boolean validateOTPCode(User user, int code) {
        Optional<OTP_Code> otpOpt = otpRepository.findTopByUserAndCodeAndUsedFalseOrderByCreatedAtDesc(user, code);
        if (otpOpt.isEmpty()) {
            return false;
        }
        OTP_Code otp = otpOpt.get();
        if (otp.getExpiresAt().before(new Timestamp(System.currentTimeMillis()))) {
            return false;
        }
        otp.setUsed(true);
        otpRepository.save(otp);
        return true;
    }
}
