package com.lootopia.lootopia.Controllers;

import com.lootopia.lootopia.Services.StripeService;
import com.stripe.model.PaymentIntent;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestParam Double amount, @RequestParam String currency) {
        try {
            PaymentIntent intent = stripeService.createPaymentIntent(amount, currency);
            return ResponseEntity.ok(intent);
        } catch (StripeException e) {
            e.printStackTrace(); // Ajoute ceci pour voir l'erreur complète dans la console
            return ResponseEntity.status(500).body("Erreur Stripe : " + e.getMessage());
        }
    }
}
