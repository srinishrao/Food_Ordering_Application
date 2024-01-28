package com.grubhubbackend.payload;

import com.grubhubbackend.entity.OrderItems;
import lombok.Data;

import javax.persistence.Column;
import java.util.Date;
import java.util.List;

@Data
public class OrderDto {
    private long orderID;
    private long restaurantID;
    private long userID;
    private String firstName;
    private String lastName;
    private String address;
    private long totalPrice;
    private String orderStatus;
    private String creationTime;
    private String modifiedTime;
    private List<OrderItems> orderItems;
}
