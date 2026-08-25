package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("Hello, World!");
	}
	@GetMapping("/hello")
    public String hello() {
        return "Hello Spring Boot API";
    }	
	@GetMapping("/student/{id}")
	public String getStudent(@PathVariable int id) {
    return "Sinh viên có mã: " + id;
	}

}
