package com.grubhubbackend.service;

import com.grubhubbackend.entity.Item;
import com.grubhubbackend.entity.Restaurant;
import com.grubhubbackend.entity.Section;
import com.grubhubbackend.exception.ResourceNotFoundException;
import com.grubhubbackend.payload.ItemDto;
import com.grubhubbackend.repository.ItemRepository;
import com.grubhubbackend.repository.RestaurantRepository;
import com.grubhubbackend.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private SectionRepository sectionRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public ItemDto createItem(ItemDto item) {
            Item i = new Item();
            i.setItemName(item.getItemName());
            i.setItemDescription(item.getItemDescription());
            i.setItemPrice(item.getItemPrice());
            i.setItemImage(item.getItemImage());
            Restaurant r = restaurantRepository.findByRestaurantID(item.getRestaurantID());
            i.setRestaurantID(r);
            Section s = sectionRepository.findBySectionName(item.getSectionName());
            i.setSectionID(s);
            itemRepository.save(i);
            return item;

    }

    public Item getItemById(long id){
        return itemRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Item", "ItemId", id));
    }

    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }

    public List<Item> getItemsBySectionID(Long id){
        System.out.println(id);
        Section existingSection = sectionRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Section", "SectionID", id));
        //System.out.println(existingSection);
        List<Item> sectionItems = new ArrayList<>();
        List<Item> items = itemRepository.findAll();
        //System.out.println(items);
        for (Item item : items ){
            Section sectionID = item.getSectionID();
            System.out.println(sectionID.getSectionID());
            if(sectionID.getSectionID() == id) {
                sectionItems.add(item);
            }
            //System.out.println(item);
        }
        return sectionItems;

    }

    public List<Item> getItemsByRestaurantID(Long id){
        System.out.println(id);
        Restaurant existingRestaurant = restaurantRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Restaurant", "RestaurantID", id));
        List<Item> restaurantItems = new ArrayList<>();
        List<Item> items = itemRepository.findAll();
        for (Item item : items ){
            Restaurant restaurantID = item.getRestaurantID();
            System.out.println(restaurantID.getRestaurantID());
            if(restaurantID.getRestaurantID() == id) {
                restaurantItems.add(item);
            }
        }
        return restaurantItems;
    }

    public List<Restaurant> getRestaurantsByItemName(String itemName) {
        List<Item> itemAdded = new ArrayList<>();
        List<Item> items = itemRepository.findAll();
        for(Item item : items) {
            if(item.getItemName().toLowerCase().equals(itemName.toLowerCase())){
                itemAdded.add(item);
            }
        }
        if(itemAdded == null) {
            throw new ResourceNotFoundException("Item", "ItemName", itemName);
        } else {
            List<Restaurant> restaurants = new ArrayList<>();
            for(Item item : itemAdded) {
                Restaurant restaurantID = item.getRestaurantID();
                restaurants.add(restaurantRepository.findByRestaurantID(restaurantID.getRestaurantID()));
            }
            return restaurants;
        }
    }

    public Item updateItem(Item item, long id){
        Item existingItem = itemRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Item", "ItemId", id));

        existingItem.setItemName(item.getItemName());
        existingItem.setItemPrice(item.getItemPrice());
        existingItem.setItemImage(item.getItemImage());

        itemRepository.save(existingItem);
        return existingItem;
    }

    public void deleteItemById(long id){
        //check whether a item really exists
        itemRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Item", "ItemID", id));

        itemRepository.deleteById(id);
    }


}
