package com.example.keystorage.payload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponse {
    @NotNull
    private String accessToken;
    private boolean mfa;
}
