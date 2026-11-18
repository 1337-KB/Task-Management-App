package com.evans.task_management_api.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.evans.task_management_api.security.JwtAuthenticationFilter;

import org.springframework.http.HttpMethod;
import org.springframework.security.web.servlet.util.matcher.PathPatternRequestMatcher;

import org.springframework.security.config.Customizer;

import java.beans.BeanProperty;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.evans.task_management_api.repository.UserRepository;
import com.evans.task_management_api.model.AppUser;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public SecurityFilterChain
    filterChain(
        HttpSecurity http)
        throws Exception{
            http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers(
                        "/swagger-ui/**",
                        "/v3/api-docs/**"
                    ).permitAll()
                    .requestMatchers(
                        "/api/auth/login"
                    ).permitAll()
                    .anyRequest().authenticated()
                )
                .addFilterBefore(
                    jwtAuthenticationFilter(),
                    UsernamePasswordAuthenticationFilter.class
                );
            return http.build();
        }

    @Bean
    CommandLineRunner seedUsers(
        UserRepository repository,
        PasswordEncoder encoder
    ) {
        return args -> {
            if (repository.findByUsername("admin").isEmpty()) {
                AppUser user = new AppUser();
                user.setUsername("admin");
                user.setPassword(encoder.encode("password123"));
                repository.save(user);
            }
        };
    }
}
