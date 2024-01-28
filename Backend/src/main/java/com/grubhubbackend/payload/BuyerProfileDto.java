package com.grubhubbackend.payload;

import lombok.Data;

@Data
public class BuyerProfileDto {
        private long userID;
        private String firstName;
        private String lastName;
        private String email;
        private long phoneNumber;
        private String userType;
        private String profileImage;
        private String address;
}
