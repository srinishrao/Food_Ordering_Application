package com.grubhubbackend.repository;

import com.grubhubbackend.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Restaurant findByRestaurantName(String Restaurant_Name);
    Long deleteByRestaurantName(String Restaurant_Name);
    Restaurant findByRestaurantID(Long Restaurant_ID);
    List<Restaurant> getRestaurantsByCuisine(String cuisine);
}
