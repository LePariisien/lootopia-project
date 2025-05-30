package com.lootopia.lootopia.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lootopia.lootopia.Services.LocationServClient;

@RestController
@RequestMapping("/api/test")
public class TestController extends AbstractController {

    @Autowired
    private LocationServClient locationServClient;

    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    @GetMapping("/user")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/linkLocation")
    public void test() {
        locationServClient.checkGatewayHealth();
    }

}
