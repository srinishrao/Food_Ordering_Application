package com.grubhubbackend.payload;

import lombok.Data;

@Data
public class OwnerDto {

    private long ownerID;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String userType;

    private String restaurantName;

    private String zipCode;
}
