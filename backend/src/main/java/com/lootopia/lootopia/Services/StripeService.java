package com.lootopia.lootopia.Services;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    public PaymentIntent createPaymentIntent(Double amount, String currency) throws StripeException {
        // Conversion en centimes (ex: 10.50€ -> 1050)
        long amountInCents = Math.round(amount * 100);
        System.out.println("Amount in cents: " + amountInCents);
        System.out.println("Currency: " + currency);
        PaymentIntentCreateParams params =
            PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .build();
        System.out.println("PaymentIntentCreateParams: " + params);
        return PaymentIntent.create(params);
    }
}
