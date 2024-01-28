package com.grubhubbackend.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "sections")
public class Section implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Section_ID")
    private Long sectionID;

    @ManyToOne(targetEntity = Restaurant.class)
    @JoinColumn(name = "fk_Restaurant_ID", nullable = false, referencedColumnName = "Restaurant_ID")
    private Restaurant restaurantID;

    @Column(name = "Section_Name", nullable = false)
    private String sectionName;

    @OneToMany(targetEntity = Item.class, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    //@JoinColumn(name = "fk_Item_ID", referencedColumnName = "Item_ID")
    private Set<Item> items = new HashSet<Item>();
    //private List<Item> items;

    public Long getSectionID() {
        return sectionID;
    }

    public void setSectionID(Long sectionID) {
        this.sectionID = sectionID;
    }

    public Restaurant getRestaurantID() {
        return restaurantID;
    }

    public void setRestaurantID(Restaurant restaurantID) {
        this.restaurantID = restaurantID;
    }

    public String getSectionName() {
        return sectionName;
    }

    public void setSectionName(String sectionName) {
        this.sectionName = sectionName;
    }

    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

    public void addItem(Item item) {
        items.add(item);
    }

    public void removeItem(Item item) {
        items.remove(item);
    }
}
