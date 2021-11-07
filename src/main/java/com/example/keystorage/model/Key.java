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
public class Key {
    @NotBlank
    private String value;
    @NotBlank
    private String pair;

    public Key(Key key) {
        this.value = key.value;
        this.pair = key.pair;
    }
}
