package com.lootopia.lootopia.Services;

import java.io.UnsupportedEncodingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.lootopia.lootopia.Entities.User;
import com.lootopia.lootopia.Exceptions.CustomException;
import com.lootopia.lootopia.Repositories.UserRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailService {

    @Value("${spring.mail.username}")
    private String mailFrom;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private UserService userService;

    public ResponseEntity<?> mailVerify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode)
                .orElseThrow(() -> new CustomException("Utilisateur introuvable ou email déjà vérifié",
                        HttpStatus.NOT_FOUND));

        if (user.isEmailVerified()) {
            throw new CustomException("Email déjà vérifié", HttpStatus.CONFLICT);
        }

        if (user.isEnabled()) {
            user.setVerificationCode(null);
            user.setEmailVerified(true);
            var player = playerService.create(user.getUsername());
            user.setPlayer(player);

            userRepository.save(user);

            userService.createUserProfile(player.getNickname());

            return ResponseEntity.ok("Email verifié avec succès ! Vous pouvez maintenant vous connecter.");
        }

        throw new CustomException("Email déjà vérifié ou compte désactivé", HttpStatus.BAD_REQUEST);
    }

    public void sendVerificationEmailRegister(User user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = mailFrom;
        String senderName = "L'équipe Lootopia";
        String subject = "Confirmation de votre adresse e-mail";
        String content = "Bonjour [[name]],<br><br>"
                + "Merci de vous être inscrit sur Lootopia !<br>"
                + "Pour finaliser votre inscription et vérifier votre adresse e-mail, veuillez cliquer sur le bouton ci-dessous :<br><br>"
                + "<a href=\"[[URL]]\" target=\"_blank\" style=\"display: inline-block; padding: 10px 20px; "
                + "font-size: 16px; color: white; background-color:rgb(57, 112, 230); text-decoration: none; "
                + "border-radius: 5px;\">VÉRIFIER MON ADRESSE</a><br><br>"
                + "Si le bouton ne fonctionne pas, copiez-collez le lien suivant dans votre navigateur :<br>"
                + "<p>[[URL]]</p><br>"
                + "Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer cet e-mail.<br><br>"
                + "Merci et à très bientôt sur Lootopia !<br><br>"
                + "<em>L'équipe Lootopia</em>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        String verifyURL = siteURL + "/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

}