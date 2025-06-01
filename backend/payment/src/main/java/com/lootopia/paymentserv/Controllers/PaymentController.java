package com.lootopia.paymentserv.Controllers;

import com.lootopia.paymentserv.Services.StripeService;
import com.stripe.model.PaymentIntent;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.lootopia.paymentserv.DTO.PaymentDto;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestParam Double amount) {
        try {
            PaymentIntent intent = stripeService.createPaymentIntent(amount);
            PaymentDto dto = new PaymentDto(intent.getClientSecret());
            return ResponseEntity.ok(dto);
        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur Stripe : " + e.getMessage());
        }
    }
}
