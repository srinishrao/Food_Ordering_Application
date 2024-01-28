package com.grubhubbackend.controller;

import com.grubhubbackend.entity.Item;
import com.grubhubbackend.entity.Order;
import com.grubhubbackend.entity.OrderItems;
import com.grubhubbackend.payload.OrderDto;
import com.grubhubbackend.service.OrderItemsService;
import com.grubhubbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemsService orderItemsService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/order/createOrder")
    public ResponseEntity<Object> createOrder(@RequestBody OrderDto orderDto) {
        System.out.println("Inside Controller");
        return new ResponseEntity<Object>(orderService.createOrder(orderDto), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/order/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable("id") Long OrderID){
        return new ResponseEntity<OrderDto>(orderService.getOrderById(OrderID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/owner/order/{id}")
    public ResponseEntity<List<OrderDto>> getOrdersByRestaurantId(@PathVariable("id") Long RestaurantID){
        return new ResponseEntity<List<OrderDto>>(orderService.getOrdersByRestaurantId(RestaurantID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/owner/updateOrder/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable("id") Long OrderID, @RequestBody Order order){
        return new ResponseEntity<Order>(orderService.updateOrder(order, OrderID), HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/buyer/newOrder/{id}")
    public ResponseEntity<List<OrderDto>> getNewOrdersByUserID(@PathVariable("id") Long UserID){
        return new ResponseEntity<List<OrderDto>>(orderService.getNewOrdersByUserID(UserID), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/buyer/pastOrder/{id}")
    public ResponseEntity<List<OrderDto>> getPastOrdersByUserID(@PathVariable("id") Long UserID){
        return new ResponseEntity<List<OrderDto>>(orderService.getPastOrdersByUserID(UserID), HttpStatus.OK);
    }

    @PutMapping("/owner/cancelOrder/{id}")
    public ResponseEntity<String> cancelOrder(@PathVariable("id") Long OrderID){
        orderService.cancelOrder(OrderID);
        return new ResponseEntity<String>("Order cancelled Successfully", HttpStatus.OK);
    }

}




/*

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelOrder(@PathVariable("id") long OrderID){
        //delete order from DB
        orderService.cancelOrder(OrderID);
        return new ResponseEntity<String>("Order cancelled Successfully", HttpStatus.OK);
    }

 */

