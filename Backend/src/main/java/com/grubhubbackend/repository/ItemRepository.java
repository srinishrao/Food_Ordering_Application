package com.grubhubbackend.repository;

import com.grubhubbackend.entity.Item;
import com.grubhubbackend.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByItemName(String itemName);
    //Section findBySectionID(Long sectionID);
    List<Item> findBySectionIDItems(Long sectionID);
    Long deleteBySectionID(Section sectionID);
}
