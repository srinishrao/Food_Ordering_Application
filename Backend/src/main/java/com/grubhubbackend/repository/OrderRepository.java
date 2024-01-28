package com.grubhubbackend.repository;

import com.grubhubbackend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByOrderID(Long orderID);
    List<Order> findByRestaurantID(Long restaurantID);
}
