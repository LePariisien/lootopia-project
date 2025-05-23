package com.location.locationserv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class LocationServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(LocationServerApplication.class, args);
	}

}
