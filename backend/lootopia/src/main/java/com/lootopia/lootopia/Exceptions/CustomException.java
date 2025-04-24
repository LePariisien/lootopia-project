package com.lootopia.lootopia.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class CustomException extends RuntimeException {

    private final HttpStatus status;

    public CustomException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public ResponseEntity<Map<String, String>> toResponseEntity() {
        Map<String, String> error = new HashMap<>();
        error.put("error", this.getMessage());
        return ResponseEntity.status(this.status).body(error);
    }
}