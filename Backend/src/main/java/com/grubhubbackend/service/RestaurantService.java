package com.grubhubbackend.service;

import com.grubhubbackend.entity.Item;
import com.grubhubbackend.entity.Restaurant;
import com.grubhubbackend.exception.ResourceNotFoundException;
import com.grubhubbackend.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RestaurantService {

    private RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        super();
        this.restaurantRepository = restaurantRepository;
    }

    public Restaurant addRestaurant(Restaurant restaurant) {
        if(restaurantRepository.findByRestaurantName(restaurant.getRestaurantName()) != null) {
            return null;
        }
        else {
            return restaurantRepository.save(restaurant);
        }
    }

    public Restaurant getRestaurantById(long id){
        return restaurantRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Restaurant", "RestaurantId", id));
    }

    public Restaurant getRestaurantByName(String restaurantName) {
        Optional<Restaurant> restaurant = Optional.ofNullable(restaurantRepository.findByRestaurantName(restaurantName));
        if(restaurant.isPresent()){
            return restaurant.get();
        } else {
            throw new ResourceNotFoundException("Restaurant", "RestaurantName", restaurantName);
        }
    }

    public List<Restaurant> getRestaurantsByCuisine(String cuisine) {
        List<Restaurant> restaurants = new ArrayList<>();
        List<Restaurant> allRestaurants = restaurantRepository.findAll();
        for(Restaurant res : allRestaurants) {
            if(res.getCuisine().toLowerCase().equals(cuisine.toLowerCase())) {
                restaurants.add(res);
            }
        }
        if(restaurants == null) {
            throw new ResourceNotFoundException("Restaurant", "Cuisine", cuisine);
        }
        return restaurants;
    }

    public Restaurant updateRestaurant(Restaurant restaurant, String RestaurantName) {
        Restaurant existingRestaurant = restaurantRepository.findByRestaurantName(RestaurantName);
        if(existingRestaurant != null){
            existingRestaurant.setRestaurantName(restaurant.getRestaurantName());
            existingRestaurant.setRestaurantImage(restaurant.getRestaurantImage());
            existingRestaurant.setCuisine(restaurant.getCuisine());
            existingRestaurant.setZipCode(restaurant.getZipCode());

            restaurantRepository.save(existingRestaurant);
            return existingRestaurant;
        }
        else {
            throw new ResourceNotFoundException("Restaurant", "RestaurantName", RestaurantName);
        }
    }

    public void deleteRestaurantByName(String restaurantName) {
        if(restaurantRepository.findByRestaurantName(restaurantName) == null) {
            throw new ResourceNotFoundException("Restaurant", "restaurantName", restaurantName);
        }
        else {
            restaurantRepository.deleteByRestaurantName(restaurantName);
        }
    }
}
