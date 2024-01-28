package com.grubhubbackend.service;

import com.grubhubbackend.repository.OrderItemsRepository;
import com.grubhubbackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrderItemsService {
    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private OrderRepository orderRepository;

}
