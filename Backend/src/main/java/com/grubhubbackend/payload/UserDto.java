package com.grubhubbackend.payload;

import lombok.Data;

@Data
public class UserDto {
    private long userID;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private long phoneNumber;
    private String address;
    private long restaurantId;
    private String userType;
    private String image;

    @Override
    public String toString() {
        return "Ticket{" +
                "firstName='" + firstName + '\'' +
                ", lastName=" + lastName +
                ", email=" + email +
                ", phoneNumber=" + phoneNumber +
                '}';
    }

}
