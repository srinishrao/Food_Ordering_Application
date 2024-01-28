package com.grubhubbackend.repository;

import com.grubhubbackend.entity.Restaurant;
import com.grubhubbackend.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends JpaRepository<Section, Long> {
    Restaurant findByRestaurantID(Long restaurantID);
    Section findBySectionName(String sectionName);
    Section findBySectionID(Long sectionID);
    Long deleteBySectionID(long sectionID);
}
