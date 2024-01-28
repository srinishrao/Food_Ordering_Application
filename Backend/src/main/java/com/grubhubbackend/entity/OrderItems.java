package com.grubhubbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "orderItems")
@JsonIgnoreProperties({ "orders" , "orderID", "orderItemID" })
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderItem_ID", nullable = false)
    private Long orderItemID;

    @ManyToOne(targetEntity = Order.class)
    @JoinColumn(name = "fk_Order_ID", nullable = false, referencedColumnName = "Order_ID")
    private Order orderID;

    @Column(name = "Item_ID", nullable = false)
    private long itemID;

    @Column(name = "Item_Name", nullable = false)
    private String itemName;

    @Column(name = "Quantity", nullable = false)
    private long quantity;

    @Column(name = "Item_Price", nullable = false)
    private long itemPrice;

    @JsonIgnore
    @ManyToOne(targetEntity = Order.class, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    private List<Order> orders;
}
