package com.example.keystorage.model;

import lombok.*;
import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    private String displayName;
    private Date birthday;
    private String profilePictureUrl;
    private Set<Address> addresses;
}
