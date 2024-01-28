package com.grubhubbackend.entity;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

@Entity
@Table(name="Users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="User_ID")
    private Long userID;

    @Column(name="First_Name", nullable = false)
    private String firstName;

    @Column(name="Last_Name", nullable = false)
    private String lastName;

    @Column(name="Email", unique = true, nullable = false)
    private String email;

    @Column(name="Password", nullable = false)
    private String password;

    @Column(name="Phone_Number")
    private long phoneNumber;

    @Column(name="Address")
    private String address;

    @Column(name="User_Type", nullable = false)
    private String userType;

    @Column(name= "Profile_Image")
    private String profileImage;

    @Column(name= "Restaurant_Name")
    private String restaurantName;

    //@OneToOne (mappedBy = "Restaurant_ID", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    //@JoinColumn(name = "Restaurants_Restaurant_ID")
    //@Column(name = "Restaurant_ID")
    @OneToOne(targetEntity = Restaurant.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_Restaurant_ID", referencedColumnName = "Restaurant_ID")
    private Restaurant restaurantID;

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public Restaurant getRestaurantID() {
        return restaurantID;
    }

    public void setRestaurantID(Restaurant restaurantID) {
        this.restaurantID = restaurantID;
    }
}
