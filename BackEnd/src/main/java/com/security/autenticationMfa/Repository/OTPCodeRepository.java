package com.security.autenticationMfa.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.security.autenticationMfa.Models.OTP_Code;
import com.security.autenticationMfa.Models.User;

public interface OTPCodeRepository extends JpaRepository<OTP_Code, Long> {
Optional<OTP_Code> findTopByUserAndCodeAndUsedFalseOrderByCreatedAtDesc(User user, int code);
}