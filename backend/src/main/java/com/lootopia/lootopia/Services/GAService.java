package com.lootopia.lootopia.Services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorConfig;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;

@Service
public class GAService {

    @Value("${spring.application.name}")
    private String applicationName;

    public String generateKey() {
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        final GoogleAuthenticatorKey key = gAuth.createCredentials();
        return key.getKey();
    }

    public boolean isValid(String secret, String code) {
        GoogleAuthenticator gAuth = new GoogleAuthenticator(
                new GoogleAuthenticatorConfig.GoogleAuthenticatorConfigBuilder().build());
        return gAuth.authorize(secret, Integer.parseInt(code));
    }

    public String generateQRUrl(String secret, String username) {
        String url = GoogleAuthenticatorQRGenerator.getOtpAuthTotpURL(
                applicationName,
                username,
                new GoogleAuthenticatorKey.Builder(secret).build());
        try {
            return generateQRBase64(url);
        } catch (Exception e) {
            return null;
        }
    }

    public static String generateQRBase64(String qrCodeText) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            Map<EncodeHintType, Object> hintMap = new HashMap<>();
            hintMap.put(EncodeHintType.CHARACTER_SET, "UTF-8");

            BitMatrix bitMatrix = qrCodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, 200, 200, hintMap);
            BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "png", baos);
            byte[] imageBytes = baos.toByteArray();

            return Base64.getEncoder().encodeToString(imageBytes);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}