package com.grubhubbackend.repository;

import com.grubhubbackend.entity.Order;
import com.grubhubbackend.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {
    List<OrderItems> findByOrderID(Long orderID);
    //Long deleteOrderByID(Order orderID);
}
