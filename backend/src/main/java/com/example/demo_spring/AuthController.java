package com.example.demo_spring;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authManager;

    public AuthController(AppUserRepository userRepository, PasswordEncoder passwordEncoder,
                          AuthenticationManager authManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authManager = authManager;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body, HttpServletRequest request) {
        String name = body.get("name");
        String email = body.get("email");
        String password = body.get("password");

        if (name == null || name.isBlank() || email == null || email.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Nome, e-mail e senha são obrigatórios."));
        }

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "E-mail já cadastrado."));
        }

        AppUser user = new AppUser();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        authenticateAndCreateSession(email, password, request);

        return ResponseEntity.ok(Map.of("email", email, "name", name));
    }

@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body, HttpServletRequest request) {
        String email = body.get("email");
        String password = body.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "E-mail e senha são obrigatórios."));
        }

        try {
            authenticateAndCreateSession(email, password, request);
            
            // Busca o usuário para recuperar o nome salvo no banco
            AppUser user = userRepository.findByEmail(email).orElse(null);
            String name = user != null ? user.getName() : "";

            return ResponseEntity.ok(Map.of("email", email, "name", name));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "E-mail ou senha inválidos."));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        SecurityContextHolder.clearContext();
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().build();
    }

@GetMapping("/me")
    public ResponseEntity<?> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getName())) {
            return ResponseEntity.status(401).body(Map.of("error", "Não autenticado."));
        }
        
        // Busca o usuário logado no banco para retornar o nome correto
        String email = auth.getName();
        AppUser user = userRepository.findByEmail(email).orElse(null);
        String name = user != null ? user.getName() : "";

        return ResponseEntity.ok(Map.of("email", email, "name", name));
    }

    private void authenticateAndCreateSession(String email, String password, HttpServletRequest request) {
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        request.getSession(true).setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
    }
    
}