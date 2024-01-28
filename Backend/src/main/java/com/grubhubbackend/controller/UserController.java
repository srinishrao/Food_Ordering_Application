package com.grubhubbackend.controller;


import com.grubhubbackend.payload.BuyerProfileDto;
import com.grubhubbackend.payload.OwnerDto;
import com.grubhubbackend.entity.User;
import com.grubhubbackend.payload.LoginDto;
import com.grubhubbackend.payload.OwnerProfileDto;
import com.grubhubbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

     @Autowired
     UserService userService;

    public UserController() {
        super();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    //build create user REST API
    @PostMapping("/Buyersignup")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        System.out.println("Firstname: " + user.getFirstName());
        System.out.println("Lastname: " + user.getLastName());
        System.out.println("Email: " + user.getEmail());
        System.out.println("Password: " + user.getPassword());
        User existingUser = userService.createUser(user);
        System.out.println("After service");
        if (existingUser == null) {
            System.out.println("Inside If");
            return new ResponseEntity<Object>("Email already exists", HttpStatus.BAD_REQUEST);
        } else {
            System.out.println("Inside else");
            return new ResponseEntity<Object>(existingUser, HttpStatus.CREATED);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long UserID) {
        return new ResponseEntity<User>(userService.getUserById(UserID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/useremail/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
        System.out.println("Inside Controller");
        return new ResponseEntity<User>(userService.getUserByEmail(email), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/ownerProfile/{id}")
    public ResponseEntity<OwnerProfileDto> updateOwner(@PathVariable("id") long UserID, @RequestBody OwnerProfileDto profileDto) {
        return new ResponseEntity<OwnerProfileDto>(userService.updateOwner(profileDto, UserID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/buyerProfile/{id}")
    public ResponseEntity<BuyerProfileDto> updateBuyer(@PathVariable("id") long UserID, @RequestBody BuyerProfileDto profileDto) {
        return new ResponseEntity<BuyerProfileDto>(userService.updateBuyer(profileDto, UserID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping({"/Buyerlogin","/Ownerlogin"})
    public ResponseEntity<String> loginUser(@RequestBody LoginDto logindto) {
        System.out.println("Inside Controller");
        System.out.println(logindto.getEmail());
        String Login = userService.loginUser(logindto.getEmail(), logindto.getPassword());
        System.out.println("After Login");
        if (Login.equals("Login Successfull")) {
            System.out.println("Inside If");
            return new ResponseEntity<String>(Login, HttpStatus.OK);
        } else {
            System.out.println("Inside else");
            return new ResponseEntity<String>(Login, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/Ownersignup")
    public ResponseEntity<Object> createOwner(@RequestBody OwnerDto owner) {
        System.out.println("Inside Controller");
        OwnerDto existingUser = userService.createOwner(owner);
        System.out.println("After service");
        if(existingUser == null){
            System.out.println("Inside service if");
            return new ResponseEntity<Object>("Email already exists" , HttpStatus.BAD_REQUEST);
        }
        else {
            System.out.println("Inside service else");
            return new ResponseEntity<Object>(existingUser , HttpStatus.CREATED);
        }
    }

}