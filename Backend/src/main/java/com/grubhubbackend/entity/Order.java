package com.grubhubbackend.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Order_ID", nullable = false)
    private Long orderID;

    @Column(name = "Restaurant_ID", nullable = false)
    private Long restaurantID;

    @Column(name="User_ID", nullable = false)
    private Long userID;

    @Column(name = "First_Name", nullable = false)
    private String firstName;

    @Column(name = "Last_Name", nullable = false)
    private String lastName;

    @Column(name = "Address", nullable = false)
    private String address;

    @Column(name = "Total_Price", nullable = false)
    private long totalPrice;

    @Column(name = "Order_Status", nullable = false)
    private String orderStatus;

    @Column(name="Creation_Time", nullable = false)
    private String creationTime;

    @Column(name="Modified_Time", nullable = false)
    private String modifiedTime;

    @OneToMany(targetEntity = OrderItems.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    //@JsonIgnoreProperties("orderID")
    //@JsonIgnoreProperties(ignoreUnknown = true)
    private List<OrderItems> orderItems;

    @JsonIgnore
    public List<OrderItems> getOrderItems() {
        return orderItems;
    }

    @JsonIgnore
    public void setOrderItems(List<OrderItems> orderItems) {
        this.orderItems = orderItems;
    }

    /*@Override
    public String toString() {
        return "{" + " orderID='" + getOrderID() + "'" + ", restaurantID='" + getRestaurantID() + "'"
                + ", userID='" + getUserID() + "'" + ", firstName='" + getFirstName() + "'" +
                ", lastName='" + getLastName() + "'" + ", address='" + getAddress() + "'" +
                ", totalPrice='" + getTotalPrice() + "'" + ", orderStatus='" + getOrderStatus() + "'" +
                ", creationTime='" + getCreationTime() + "'" + ", ,modifiedTime='" + getModifiedTime() + "'" +
                ", orderItems='" + getOrderItems()  + "}";
    }*/

}
