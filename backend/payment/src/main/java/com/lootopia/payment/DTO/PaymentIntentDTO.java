package com.lootopia.payment.DTO;

public class PaymentIntentDTO {
    private String clientSecret;

    public PaymentIntentDTO(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }
}