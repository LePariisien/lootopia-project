package com.lootopia.payment.DTO;
import lombok.Data;

@Data
public class PaymentDto {
    private String clientSecret;

    public PaymentDto(String clientSecret) {
        this.clientSecret = clientSecret;
    }

}