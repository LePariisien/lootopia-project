package com.lootopia.lootopia.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {

    private String username;

    @Builder.Default
    private String tokenType = "Bearer";

    private String accessToken;

    private String refreshToken;

}