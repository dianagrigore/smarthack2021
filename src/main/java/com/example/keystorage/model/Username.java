package com.example.keystorage.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Username {
    @NotBlank
    String username;
    @NotBlank
    Password password;

    public Username(Username username) {
        this.username = username.username;
        this.password = username.password;
    }
}
