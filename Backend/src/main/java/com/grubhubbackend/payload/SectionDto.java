package com.grubhubbackend.payload;

import com.grubhubbackend.entity.Restaurant;
import lombok.Data;

@Data
public class SectionDto {
    private Long restaurantID;
    private String sectionName;
}
