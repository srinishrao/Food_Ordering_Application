package com.grubhubbackend.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
//@Table(name = "Restaurants")
@Table(name = "Restaurants", uniqueConstraints = { @UniqueConstraint(columnNames = { "Restaurant_Name" }) })
public class Restaurant implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Restaurant_ID")
    private Long restaurantID;

    @Column(name = "Restaurant_Name", unique = true, nullable = false)
    private String restaurantName;

    @Column(name = "Zip_Code", nullable = false)
    private String zipCode;

    @Column(name = "Cuisine")
    private String cuisine;

    @Column(name = "Restaurant_Image")
    private String restaurantImage;

    @OneToMany(targetEntity = Section.class, cascade = CascadeType.ALL)
    private List<Section> sections;

    public List<Section> getSections() {
        return sections;
    }

    public void setSections(List<Section> sections) {
        this.sections = sections;
    }

    public Long getRestaurantID() {
        return restaurantID;
    }

    public void setRestaurantID(Long restaurantID) {
        this.restaurantID = restaurantID;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getRestaurantImage() {
        return restaurantImage;
    }

    public void setRestaurantImage(String restaurantImage) {
        this.restaurantImage = restaurantImage;
    }
}
