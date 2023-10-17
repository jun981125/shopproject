package pack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import pack.customer.RecaptchaConfig;

@SpringBootApplication
public class Broccoli123Application implements CommandLineRunner {

    @Autowired
    private RecaptchaConfig recaptchaConfig;

    @Value("${recaptcha.secretKey}")
    private String recaptchaSecretKey;

    public static void main(String[] args) {
        SpringApplication.run(Broccoli123Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // 애플리케이션이 시작될 때 Google reCAPTCHA 비밀 키 설정
        recaptchaConfig.setSecretKey(recaptchaSecretKey);


    }
}
