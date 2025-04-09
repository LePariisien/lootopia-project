package com.lootopia.lootopia.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class LoginDto {

    private String email;

    private String password;

    private String mfaCode;

}
