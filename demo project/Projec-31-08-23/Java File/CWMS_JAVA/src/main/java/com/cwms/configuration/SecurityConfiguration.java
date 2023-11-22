package com.cwms.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cwms.security.JwtAuthenticationEntryPoint;
import com.cwms.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

    @Autowired
    private JwtAuthenticationEntryPoint point;
    @Autowired
    private JwtAuthenticationFilter filter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .authorizeRequests(auth -> auth            		
                		.requestMatchers("/auth/**").permitAll()
                		.requestMatchers("/rights").permitAll()
                		.requestMatchers("/ShippingDetails/**").permitAll()
                		.requestMatchers("/jar/addJar/**").permitAll()
                		.requestMatchers("/jar/**").permitAll()
                		.requestMatchers("/importsub/**").permitAll()
                		.requestMatchers("/jardetail/**").permitAll()
                		.requestMatchers("/representive/**").permitAll()
                		.requestMatchers("/api/processnextids/**").permitAll()
                		.requestMatchers("/holiday/**").permitAll()
                		.requestMatchers("/sbtransactions/**").permitAll()
                		.requestMatchers("/UserCreation/**").permitAll()
                		.requestMatchers("/export/**").permitAll()
                        .requestMatchers("/user/**").permitAll()
                		.requestMatchers("/parties/**").permitAll()
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/import/**").permitAll()
                        .requestMatchers("/import/tpdate").permitAll()
                        .requestMatchers("/api1/**").permitAll()
                        .requestMatchers("/api2/**").permitAll()
                        .requestMatchers("/Airline/**").permitAll()
                        .requestMatchers("service/**").permitAll()
                        .requestMatchers("cfstarrif/**").permitAll()
                        .requestMatchers("/tarrif/**").permitAll()
                        .requestMatchers("/range/**").permitAll()
                        .requestMatchers("/home/**").authenticated()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
