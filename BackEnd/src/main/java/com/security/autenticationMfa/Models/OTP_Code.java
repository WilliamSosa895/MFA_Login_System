package com.security.autenticationMfa.Models;

import jakarta.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "otp_code")
public class OTP_Code implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int code;

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Column(nullable = false)
    private Timestamp expiresAt;

    @Column
    private String device;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean used;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getCode() { return code; }
    public void setCode(int code) { this.code = code; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Timestamp expiresAt) { this.expiresAt = expiresAt; }

    public String getDevice() { return device; }
    public void setDevice(String device) { this.device = device; }

    public boolean isUsed() { return used; }
    public void setUsed(boolean used) { this.used = used; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
