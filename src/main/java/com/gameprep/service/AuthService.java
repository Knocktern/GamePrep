package com.gameprep.service;

import com.gameprep.dto.AuthResponseDto;
import com.gameprep.dto.LoginRequestDto;
import com.gameprep.dto.PlayerDto;
import com.gameprep.dto.SignupRequestDto;
import com.gameprep.mapper.PlayerMapper;
import com.gameprep.model.Player;
import com.gameprep.repository.PlayerRepository;
import java.util.Optional;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final PlayerRepository playerRepository;
    private final PlayerMapper playerMapper;
    private final PasswordEncoder passwordEncoder;

    public AuthService(PlayerRepository playerRepository, PlayerMapper playerMapper, PasswordEncoder passwordEncoder) {
        this.playerRepository = playerRepository;
        this.playerMapper = playerMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponseDto signup(SignupRequestDto request) {
        String username = normalize(request.getUsername());
        String password = request.getPassword();

        if (username.isBlank()) {
            throw new RuntimeException("Username is required");
        }
        if (password == null || password.length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }

        long totalPlayers = playerRepository.count();
        Optional<Player> existing = playerRepository.findByUsername(username);
        if (totalPlayers > 0 && existing.isEmpty()) {
            throw new RuntimeException("Only one gamer account is allowed");
        }
        if (existing.isPresent()) {
            Player player = existing.get();
            if (player.getPasswordHash() == null || player.getPasswordHash().isBlank()) {
                player.setPasswordHash(passwordEncoder.encode(password));
                player.setAuthToken(generateToken());
                Player saved = playerRepository.save(player);
                return new AuthResponseDto(playerMapper.toDto(saved), "Account activated", saved.getAuthToken());
            }
            throw new RuntimeException("Username already exists");
        }

        Player player = new Player();
        player.setUsername(username);
        player.setLevel(1);
        player.setXp(0);
        player.setPasswordHash(passwordEncoder.encode(password));
        player.setAuthToken(generateToken());
        Player saved = playerRepository.save(player);
        return new AuthResponseDto(playerMapper.toDto(saved), "Signup successful", saved.getAuthToken());
    }

    public AuthResponseDto login(LoginRequestDto request) {
        String username = normalize(request.getUsername());
        String password = request.getPassword();

        if (username.isBlank() || password == null) {
            throw new RuntimeException("Username and password are required");
        }

        Player player = playerRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (player.getPasswordHash() == null || !passwordEncoder.matches(password, player.getPasswordHash())) {
            throw new RuntimeException("Invalid username or password");
        }

        player.setAuthToken(generateToken());
        Player saved = playerRepository.save(player);
        PlayerDto dto = playerMapper.toDto(saved);
        return new AuthResponseDto(dto, "Login successful", saved.getAuthToken());
    }

    public PlayerDto me(String token) {
        Player player = playerRepository.findByAuthToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
        return playerMapper.toDto(player);
    }

    public Player requirePlayer(String token) {
        if (token == null || token.isBlank()) {
            throw new RuntimeException("Missing token");
        }
        return playerRepository.findByAuthToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
    }

    public void logout(String token) {
        if (token == null || token.isBlank()) {
            return;
        }
        playerRepository.findByAuthToken(token).ifPresent(player -> {
            player.setAuthToken(null);
            playerRepository.save(player);
        });
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim();
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }
}
