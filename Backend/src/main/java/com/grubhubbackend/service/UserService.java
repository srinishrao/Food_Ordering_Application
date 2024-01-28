package com.grubhubbackend.service;

import com.grubhubbackend.payload.BuyerProfileDto;
import com.grubhubbackend.payload.OwnerDto;
import com.grubhubbackend.entity.Restaurant;
import com.grubhubbackend.entity.User;
import com.grubhubbackend.exception.ResourceNotFoundException;
import com.grubhubbackend.payload.OwnerProfileDto;
import com.grubhubbackend.repository.RestaurantRepository;
import com.grubhubbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

     @Autowired
     UserRepository userRepository;

     @Autowired
     RestaurantRepository restaurantRepository;


    public User createUser(User user) {
        System.out.println("Inside service");
        User u = userRepository.findByEmail(user.getEmail());
        if (u != null){
            System.out.println("Inside service if");
            return null;
        }
        else{
            System.out.println("Inside servicce else");
            return userRepository.save(user);
        }

    }

    public OwnerDto createOwner(OwnerDto owner) {
        System.out.println("Inside service");
        if(userRepository.findByEmail(owner.getEmail()) != null) {
            System.out.println("Inside service if");
            System.out.println(owner);
            return null;
        }
        else {
            System.out.println("Inside service else");
            Restaurant r = new Restaurant();
            Restaurant existingName = restaurantRepository.findByRestaurantName(owner.getRestaurantName());
            if(existingName == null) {
                r.setRestaurantName(owner.getRestaurantName());
                r.setZipCode(owner.getZipCode());
            }
            else {
                return null;
            }

            System.out.println(r);
            restaurantRepository.save(r);
            System.out.println(r);

            User u = new User();

            u.setFirstName(owner.getFirstName());
            u.setLastName(owner.getLastName());
            u.setEmail(owner.getEmail());
            u.setPassword(owner.getPassword());
            u.setRestaurantName(owner.getRestaurantName());
            u.setUserType(owner.getUserType());
            //u.setFk_restaurantID(r.getRestaurantID());
            u.setRestaurantID(r);

            System.out.println(r.getRestaurantID());
            System.out.println(u);
            userRepository.save(u);

            return owner;
        }
    }

    public User getUserById(long id){
        return userRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("User", "UserId", id));
    }

    public User getUserByEmail(String email){
        System.out.println("Inside Service");
        User existingUser = userRepository.findByEmail(email);
        System.out.println(existingUser);
        if(existingUser == null) {
            System.out.println("Inside service if");
            throw new ResourceNotFoundException("User", "Email", email);
        } else {
            System.out.println("Inside service else");
            return existingUser;
        }
    }

    public OwnerProfileDto updateOwner(OwnerProfileDto profileDto, long id){
        User existingUser = userRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("User", "UserId", id));
        System.out.println(existingUser.toString());
        if(existingUser.getUserType().equals("Owner")){
            existingUser.setFirstName(profileDto.getFirstName());
            existingUser.setLastName(profileDto.getLastName());
            existingUser.setEmail(profileDto.getEmail());
            existingUser.setPhoneNumber(profileDto.getPhoneNumber());
            existingUser.setRestaurantName(profileDto.getRestaurantName());
            existingUser.setProfileImage(profileDto.getProfileImage());
            Restaurant restID = existingUser.getRestaurantID();
            restID.setRestaurantName(profileDto.getRestaurantName());
            restID.setCuisine(profileDto.getCuisine());
            restID.setRestaurantImage(profileDto.getRestaurantImage());
            restaurantRepository.save(restID);
        }

        userRepository.save(existingUser);
        System.out.println(existingUser.getEmail());
        profileDto.setUserID(existingUser.getUserID());
        return profileDto;
    }

    public BuyerProfileDto updateBuyer(BuyerProfileDto profileDto, long id){
        User existingUser = userRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("User", "UserId", id));
        System.out.println(existingUser.toString());
        if(existingUser.getUserType().equals("Buyer")){
            existingUser.setFirstName(profileDto.getFirstName());
            existingUser.setLastName(profileDto.getLastName());
            existingUser.setEmail(profileDto.getEmail());
            existingUser.setPhoneNumber(profileDto.getPhoneNumber());
            existingUser.setProfileImage(profileDto.getProfileImage());
            existingUser.setAddress(profileDto.getAddress());
        }
        userRepository.save(existingUser);
        profileDto.setUserID(existingUser.getUserID());
        return profileDto;
    }

    public String loginUser(String email, String password){

        System.out.println("Inside Service");
        System.out.println(email);
        System.out.println(password);
        User user = userRepository.findByEmail(email);
        System.out.println(user);
        System.out.println("After user");
        String Login="Failure";
        if(user != null){
            System.out.println("Inside if");
            System.out.println(user.getPassword());
            System.out.println(password);
            if (user.getPassword().equals(password)) {
                    System.out.println("IF");
                    Login = "Success";
            }
        }

        if(Login.equals("Success")){
            System.out.println("if success");
            System.out.println("Email: "+ email);
            return "Login Successfull";
        }
        else{
            System.out.println("else");
            return "Invalid credentials";
        }
    }

}
