package com.grubhubbackend.controller;

import com.grubhubbackend.service.OrderItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderItemsController {
    @Autowired
    private OrderItemsService orderItemsService;

}
