package com.grubhubbackend.controller;

import com.grubhubbackend.entity.Section;
import com.grubhubbackend.entity.User;
import com.grubhubbackend.payload.SectionDto;
import com.grubhubbackend.service.SectionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/sections")
public class SectionController {
    private SectionService sectionService;

    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    //build create section REST API
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/addSection")
    public ResponseEntity<Object> createSection(@RequestBody SectionDto section){
        System.out.println("Inside Controller");
        SectionDto existingSection = sectionService.createSection(section);
        System.out.println("After Service");
        if(existingSection == null){
            System.out.println("Inside C if");
            return new ResponseEntity<Object>("Section already exists" , HttpStatus.BAD_REQUEST);
        }
        else {
            System.out.println("Inside C else");
            return new ResponseEntity<Object>(existingSection , HttpStatus.CREATED);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Section> getAllSections(){
        //return new ResponseEntity<Section>(sectionService.getSectionById(SectionID), HttpStatus.OK);
        return sectionService.getAllSections();
    }
/*
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{resID}")
    public ResponseEntity<List<Section>> getSectionsOfRestaurant(@PathVariable("resID") long RestaurantID){
        return new ResponseEntity<List<Section>>(sectionService.getSectionsOfRestaurant(RestaurantID),HttpStatus.OK);
    }
*/
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public ResponseEntity<Section> updateSection(@PathVariable("id") long SectionID, @RequestBody Section section){
        return new ResponseEntity<Section>(sectionService.updateSection(section, SectionID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSectionById(@PathVariable("id") long SectionID){
        //delete section from DB
        sectionService.deleteSectionById(SectionID);
        return new ResponseEntity<String>("Section Deleted Successfully", HttpStatus.OK);
    }

}
