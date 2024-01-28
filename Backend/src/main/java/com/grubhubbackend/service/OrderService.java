package com.grubhubbackend.service;

import com.grubhubbackend.entity.*;
import com.grubhubbackend.exception.ResourceNotFoundException;
import com.grubhubbackend.payload.ItemDto;
import com.grubhubbackend.payload.OrderDto;
import com.grubhubbackend.repository.OrderItemsRepository;
import com.grubhubbackend.repository.OrderRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    public OrderDto createOrder(OrderDto orderDto) {
        System.out.println("Inside service");
        Order order = new Order();
        order.setFirstName(orderDto.getFirstName());
        order.setLastName(orderDto.getLastName());
        order.setAddress(orderDto.getAddress());
        order.setOrderStatus(orderDto.getOrderStatus());
        order.setTotalPrice(orderDto.getTotalPrice());
        order.setCreationTime(orderDto.getCreationTime());
        order.setModifiedTime(orderDto.getModifiedTime());
        order.setUserID(orderDto.getUserID());
        order.setRestaurantID(orderDto.getRestaurantID());
        orderRepository.save(order);
        List<OrderItems> loi = orderDto.getOrderItems();
        for (OrderItems ordItems : loi) {
            Order o = orderRepository.findByOrderID(order.getOrderID());
            OrderItems oi = new OrderItems();
            oi.setOrderID(o);
            oi.setItemPrice(ordItems.getItemPrice());
            oi.setQuantity(ordItems.getQuantity());
            oi.setItemID(ordItems.getItemID());
            oi.setItemName(ordItems.getItemName());
            orderItemsRepository.save(oi);
        }
        return orderDto;
    }

    public OrderDto getOrderById(Long id) {
        orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "OrderId", id));
        Order order = orderRepository.findByOrderID(id);
        OrderDto orderDto = new OrderDto();
        orderDto.setOrderID(order.getOrderID());
        orderDto.setRestaurantID(order.getRestaurantID());
        orderDto.setUserID(order.getUserID());
        orderDto.setFirstName(order.getFirstName());
        orderDto.setLastName(order.getLastName());
        orderDto.setAddress(order.getAddress());
        orderDto.setOrderStatus(order.getOrderStatus());
        orderDto.setTotalPrice(order.getTotalPrice());
        orderDto.setCreationTime(order.getCreationTime());
        orderDto.setModifiedTime(order.getModifiedTime());

        List<OrderItems> loi = new ArrayList<>();
        List<OrderItems> all = orderItemsRepository.findAll();
        for (OrderItems ordItems : all) {
            Order orderID = ordItems.getOrderID();
            if (orderID.getOrderID() == id) {
                loi.add(ordItems);
            }
        }
        orderDto.setOrderItems(loi);
        return orderDto;
    }

    public List<OrderDto> getOrdersByRestaurantId(Long id) {
        List<Order> orders = orderRepository.findAll();
        System.out.println(orders);

        List<OrderDto> listOfOrders = new ArrayList<>();
        for (Order order : orders) {
            System.out.println("Inside for");
            if (order.getRestaurantID() == id) {
                OrderDto orderDto = new OrderDto();
                orderDto.setOrderID(order.getOrderID());
                orderDto.setUserID(order.getUserID());
                orderDto.setFirstName(order.getFirstName());
                orderDto.setLastName(order.getLastName());
                orderDto.setAddress(order.getAddress());
                orderDto.setOrderStatus(order.getOrderStatus());
                orderDto.setTotalPrice(order.getTotalPrice());
                orderDto.setCreationTime(order.getCreationTime());
                orderDto.setModifiedTime(order.getModifiedTime());

                List<OrderItems> loi = new ArrayList<>();
                List<OrderItems> all = orderItemsRepository.findAll();
                for (OrderItems ordItems : all) {
                    Order orderID = ordItems.getOrderID();
                    if (orderID.getOrderID() == orderDto.getOrderID()) {
                        loi.add(ordItems);
                    }
                }
                orderDto.setOrderItems(loi);
                System.out.println(orderDto);
                listOfOrders.add(orderDto);
                System.out.println(listOfOrders);
            }
        }
        return listOfOrders;
    }

    public Order updateOrder(Order order, Long id) {
        System.out.println(order);
        System.out.println(id);
        Order existingOrder = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "OrderId", id));
        System.out.println(existingOrder);
        existingOrder.setOrderStatus(order.getOrderStatus());
        System.out.println(existingOrder);
        orderRepository.save(existingOrder);
        return existingOrder;
    }

    public List<OrderDto> getNewOrdersByUserID(Long id) {
        List<Order> orders = orderRepository.findAll();
        System.out.println(orders);

        List<OrderDto> listOfOrders = new ArrayList<>();
        for (Order order : orders) {
            System.out.println("Inside for");
            //if (order.getUserID() == id && !order.getOrderStatus().equals("Delivered")) {
            if (order.getUserID() == id) {
                System.out.println("Inside if");
                OrderDto orderDto = new OrderDto();
                orderDto.setOrderID(order.getOrderID());
                orderDto.setUserID(order.getUserID());
                orderDto.setRestaurantID(order.getRestaurantID());
                orderDto.setFirstName(order.getFirstName());
                orderDto.setLastName(order.getLastName());
                orderDto.setAddress(order.getAddress());
                orderDto.setOrderStatus(order.getOrderStatus());
                orderDto.setTotalPrice(order.getTotalPrice());
                orderDto.setCreationTime(order.getCreationTime());
                orderDto.setModifiedTime(order.getModifiedTime());

                List<OrderItems> loi = new ArrayList<>();
                List<OrderItems> all = orderItemsRepository.findAll();
                for (OrderItems ordItems : all) {
                    Order orderID = ordItems.getOrderID();
                    if (orderID.getOrderID() == orderDto.getOrderID()) {
                        loi.add(ordItems);
                    }
                }
                orderDto.setOrderItems(loi);
                System.out.println(orderDto);
                listOfOrders.add(orderDto);
                System.out.println(listOfOrders);
            }
        }
        return listOfOrders;
    }

    public List<OrderDto> getPastOrdersByUserID(Long id) {
        List<Order> orders = orderRepository.findAll();
        System.out.println(orders);

        List<OrderDto> listOfOrders = new ArrayList<>();
        for (Order order : orders) {
            System.out.println("Inside for");
            if (order.getUserID() == id && order.getOrderStatus().equals("Delivered")) {
                System.out.println("Inside if");
                OrderDto orderDto = new OrderDto();
                orderDto.setOrderID(order.getOrderID());
                orderDto.setUserID(order.getUserID());
                orderDto.setFirstName(order.getFirstName());
                orderDto.setLastName(order.getLastName());
                orderDto.setAddress(order.getAddress());
                orderDto.setOrderStatus(order.getOrderStatus());
                orderDto.setTotalPrice(order.getTotalPrice());
                orderDto.setCreationTime(order.getCreationTime());
                orderDto.setModifiedTime(order.getModifiedTime());

                List<OrderItems> loi = new ArrayList<>();
                List<OrderItems> all = orderItemsRepository.findAll();
                for (OrderItems ordItems : all) {
                    Order orderID = ordItems.getOrderID();
                    if (orderID.getOrderID() == orderDto.getOrderID()) {
                        loi.add(ordItems);
                    }
                }
                orderDto.setOrderItems(loi);
                System.out.println(orderDto);
                listOfOrders.add(orderDto);
                System.out.println(listOfOrders);
            }
        }
        return listOfOrders;
    }

    public void cancelOrder(Long id){
        Order existingOrder = orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order", "OrderID", id));

        existingOrder.setOrderStatus("Canceled");

        orderRepository.save(existingOrder);
    }

}



