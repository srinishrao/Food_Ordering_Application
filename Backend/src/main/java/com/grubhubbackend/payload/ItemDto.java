package com.grubhubbackend.payload;

import com.grubhubbackend.entity.Restaurant;
import com.grubhubbackend.entity.Section;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
public class ItemDto {
    private long sectionID;
    private long restaurantID;
    private String itemName;
    private String itemDescription;
    private long itemPrice;
    private String itemImage;
    private String sectionName;
}
