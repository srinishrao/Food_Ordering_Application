package com.grubhubbackend.controller;

import com.grubhubbackend.entity.Item;
import com.grubhubbackend.entity.Restaurant;
import com.grubhubbackend.payload.ItemDto;
import com.grubhubbackend.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class ItemController {
    private ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    //build create item REST API
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/section/item/addItem")
    public ResponseEntity<Object> createItem(@RequestBody ItemDto item){
        return new ResponseEntity<Object>(itemService.createItem(item), HttpStatus.CREATED);
    }

    @GetMapping("/section/item/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable("id") long ItemID){
        return new ResponseEntity<Item>(itemService.getItemById(ItemID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/section/items")
    public List<Item> getAllItems(){
        //return new ResponseEntity<Section>(sectionService.getSectionById(SectionID), HttpStatus.OK);
        return itemService.getAllItems();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/section/{secID}")
    public ResponseEntity<List<Item>> getItemsBySectionID(@PathVariable("secID") Long SectionID) {
        System.out.println("Inside Controller");
        System.out.println(SectionID);
        return new ResponseEntity<List<Item>>(itemService.getItemsBySectionID(SectionID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/restaurant/{resID}")
    public ResponseEntity<List<Item>> getItemsByRestaurantID(@PathVariable("resID") Long RestaurantID) {
        System.out.println("Inside Controller");
        System.out.println(RestaurantID);
        return new ResponseEntity<List<Item>>(itemService.getItemsByRestaurantID(RestaurantID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/section/itemRestaurants/{itemName}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByItemName(@PathVariable("itemName") String itemName){
        return new ResponseEntity<List<Restaurant>>(itemService.getRestaurantsByItemName(itemName), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/section/item/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable("id") long ItemID, @RequestBody Item item){
        return new ResponseEntity<Item>(itemService.updateItem(item, ItemID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/section/item/{id}")
    public ResponseEntity<String> deleteItemById(@PathVariable("id") long ItemID){
        //delete item from DB
        itemService.deleteItemById(ItemID);
        return new ResponseEntity<String>("Item Deleted Successfully", HttpStatus.OK);
    }

}


/*
    @PutMapping("/{sectionName}")
    Item addItemToSection(@PathVariable Long itemID, @PathVariable String sectionName){
        Item item = itemRepository.findById(itemID).get();
        Section section = sectionRepository.findBySectionName(sectionName);
        item.assignSection(section);
        return itemRepository.save(item);
    }
*/
