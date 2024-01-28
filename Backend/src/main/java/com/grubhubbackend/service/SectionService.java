package com.grubhubbackend.service;

import com.grubhubbackend.entity.Item;
import com.grubhubbackend.entity.Restaurant;
import com.grubhubbackend.entity.Section;

import com.grubhubbackend.exception.ResourceNotFoundException;
import com.grubhubbackend.repository.ItemRepository;
import com.grubhubbackend.payload.SectionDto;
import com.grubhubbackend.repository.RestaurantRepository;
import com.grubhubbackend.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class SectionService {
    @Autowired
    SectionRepository sectionRepository;

    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    private ItemRepository itemRepository;

    public SectionService(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    public SectionDto createSection(SectionDto section) {
        Section s = new Section();
        s.setSectionName(section.getSectionName());
        System.out.println(section.getSectionName());
        System.out.println("After name");
        System.out.println(restaurantRepository.findByRestaurantID(section.getRestaurantID()));
        Restaurant r = restaurantRepository.findByRestaurantID(section.getRestaurantID());
        s.setRestaurantID(r);
        sectionRepository.save(s);
        return section;
    }

    public List<Section> getAllSections(){
        return sectionRepository.findAll();
    }
/*
    public List<Section> getSectionsOfRestaurant(long id){
        return sectionRepository.findAll();
    }
*/
    public Section updateSection(Section section, long id){
        Section existingSection = sectionRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Section", "sectionID", id));
        existingSection.setSectionName(section.getSectionName());
        sectionRepository.save(existingSection);
        return existingSection;
    }

    public void deleteSectionById(long id){
        //check whether a section really exists
        System.out.println("Inside section service");
        sectionRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Section", "sectionID", id));
        System.out.println("After throw");
        List<Item> items = itemRepository.findAll();
        System.out.println(items);
        for (Item item : items ) {
            System.out.println(item);
            Section sectionID = item.getSectionID();
            System.out.println(sectionID);
            if (sectionID.getSectionID() == id) {
                System.out.println("Inside if");
                itemRepository.deleteBySectionID(sectionID);
                System.out.println("After delete");
            }
        }
        sectionRepository.deleteById(id);
        System.out.println("After section delete");
    }

}