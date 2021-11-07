package com.example.keystorage.service;

import com.example.keystorage.exception.*;
import com.example.keystorage.model.*;
import com.example.keystorage.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class UserService {
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private UserRepository userRepository;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtTokenManager jwtTokenManager;
    @Autowired private TotpManager totpManager;

    public String loginUser(String username, String password) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(username, password));

        User user = userRepository.findByUsername(username).get();
        if(user.isMfa()) {
            return "";
        }

        return jwtTokenManager.generateToken(authentication);
    }

    public String verify(String username, String code) {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException( String.format("username %s", username)));

        if(!totpManager.verifyCode(code, user.getSecret())) {
            throw new BadRequestException("Code is incorrect");
        }

        return Optional.of(user)
                .map(KeyStorageUserDetails::new)
                .map(userDetails -> new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()))
                .map(jwtTokenManager::generateToken)
                .orElseThrow(() ->
                        new InternalServerException("unable to generate access token"));
    }

    public User registerUser(User user, Role role) {
        log.info("registering user {}", user.getUsername());

        if(userRepository.existsByUsername(user.getUsername())) {
            log.warn("username {} already exists.", user.getUsername());

            throw new UsernameAlreadyExistsException(
                    String.format("username %s already exists", user.getUsername()));
        }

        if(userRepository.existsByEmail(user.getEmail())) {
            log.warn("email {} already exists.", user.getEmail());

            throw new EmailAlreadyExistsException(
                    String.format("email %s already exists", user.getEmail()));
        }
        user.setActive(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(new HashSet<>() {{
            add(role);
        }});

        if(user.isMfa()) {
            user.setSecret(totpManager.generateSecret());
        }

        return userRepository.save(user);
    }

    public List<User> findAll() {
        log.info("retrieving all users");
        return userRepository.findAll();
    }

    public Optional<User> findByUsername(String username) {
        log.info("retrieving user {}", username);
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(String id) {
        log.info("retrieving user {}", id);
        return userRepository.findById(id);
    }

    public Map<Username, Password> getUsersPasses(String id) {
        Set<Username> usernameSet = userRepository.findById(id).get().getUsernames();
        Map<Username, Password> maps = new HashMap<>();
        for(Username username : usernameSet)
        {
            Password pass = username.getPassword();
            maps.put(username, pass);
        }
        return maps;
    }

    public void addUsernameForUser(String id, Username username) {
        User user = null;
        if(userRepository.findById(id).isPresent()) {
            user = userRepository.findById(id).get();
        }
        if (user != null) {
            Set<Username> usernames = user.getUsernames();
            usernames.add(username);
        }
    }

    public Username createUsername(String us, String pass) {
        Username username = new Username(us, new Password(pass));
        return username;
    }


    public void deleteUsername(String id, String value) {
        Set<Username> usernames = userRepository.findById(id).get().getUsernames();
        for(Username u : usernames)
        {
            if(Objects.equals(u.getUsername(), value)) {
                usernames.remove(u);
                return;
            }
        }
    }

}
