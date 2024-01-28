package com.grubhubbackend.controller;

import com.grubhubbackend.entity.Item;
import com.grubhubbackend.entity.Restaurant;
import com.grubhubbackend.entity.User;
import com.grubhubbackend.service.RestaurantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.List;

@RestController
@RequestMapping("/api/users/restaurants")
public class RestaurantController {
    private RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        super();
        this.restaurantService = restaurantService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/add")
    public ResponseEntity<Object> addRestaurant(@RequestBody Restaurant restaurant) {
        Restaurant existingRestaurant = restaurantService.addRestaurant(restaurant);
        if(existingRestaurant == null)
            return new ResponseEntity<Object>("Restaurant already exists", HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<Object>(existingRestaurant, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/restaurant/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable("id") long RestaurantID){
        return new ResponseEntity<Restaurant>(restaurantService.getRestaurantById(RestaurantID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{restaurantName}")
    public ResponseEntity<Restaurant> getRestaurantByName(@PathVariable("restaurantName") String RestaurantName) {
        return new ResponseEntity<Restaurant>(restaurantService.getRestaurantByName(RestaurantName), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/cuisine/{cuisine}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByCuisine(@PathVariable("cuisine") String cuisine){
        return new ResponseEntity<List<Restaurant>>(restaurantService.getRestaurantsByCuisine(cuisine), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{restaurantName}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable("restaurantName") String RestaurantName, @RequestBody Restaurant restaurant) {
        return new ResponseEntity<Restaurant>(restaurantService.updateRestaurant(restaurant, RestaurantName), HttpStatus.OK);
    }



    @DeleteMapping("/{restaurantName}")
    public ResponseEntity<String> deleteRestaurantByName(@PathVariable("restaurantName") String RestaurantName){
        restaurantService.deleteRestaurantByName(RestaurantName);
        return new ResponseEntity<String>("Restaurant Deleted Successfully", HttpStatus.OK);
    }

}
