package com.lootopia.payment.Services;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    public PaymentIntent createPaymentIntent(Double amount) throws StripeException {
        long amountInCents = Math.round(amount * 100);
        String currency = "eur";
        PaymentIntentCreateParams params =
            PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .build();
        System.out.println("PaymentIntentCreateParams: " + params);
        return PaymentIntent.create(params);
    }
}
