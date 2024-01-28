package com.grubhubbackend.entity;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;

@Data
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Item_ID", nullable = false)
    private long itemID;

    @ManyToOne(targetEntity = Section.class)
    @JoinColumn(name = "fk_Section_ID",nullable = false, referencedColumnName = "Section_ID")
    private Section sectionID;

    @ManyToOne(targetEntity = Restaurant.class)
    @JoinColumn(name = "fk_Restaurant_ID", nullable = false, referencedColumnName = "Restaurant_ID")
    private Restaurant restaurantID;

    @Column(name = "Item_Name", nullable = false)
    private String itemName;

    @Column(name = "Item_Description", nullable = false)
    private String itemDescription;

    @Column(name = "Item_Price", nullable = false)
    private long itemPrice;

    @Column(name = "Item_Image", nullable = false)
    private String itemImage;

    public void assignSection(Section sectionID){
        this.sectionID = sectionID;
    }

    public long getItemID() {
        return itemID;
    }

    public void setItemID(long itemID) {
        this.itemID = itemID;
    }

    @Autowired
    public Section getSectionID() {
        return sectionID;
    }
    @Autowired
    public void setSectionID(Section sectionID) {
        this.sectionID = sectionID;
    }

    public Restaurant getRestaurantID() {
        return restaurantID;
    }

    public void setRestaurantID(Restaurant restaurantID) {
        this.restaurantID = restaurantID;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public long getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(long itemPrice) {
        this.itemPrice = itemPrice;
    }

    public String getItemImage() {
        return itemImage;
    }

    public void setItemImage(String itemImage) {
        this.itemImage = itemImage;
    }
}
