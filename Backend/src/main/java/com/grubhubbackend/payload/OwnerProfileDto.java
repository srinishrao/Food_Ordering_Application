package com.grubhubbackend.payload;

import lombok.Data;

@Data
public class OwnerProfileDto {
    private long userID;
    private String firstName;
    private String lastName;
    private String email;
    private long phoneNumber;
    private long restaurantID;
    private String restaurantName;
    private String userType;
    private String profileImage;
    private String cuisine;
    private String restaurantImage;
}
