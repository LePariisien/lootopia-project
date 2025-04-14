package com.lootopia.lootopia.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class RegisterDto {

    private String username;

    private String password;

    private String email;

    private boolean mfaEnabled;

}
