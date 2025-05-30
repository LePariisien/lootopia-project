package com.lootopia.lootopia.Config;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiPath {

    GATEWAY_PATH("http://gateway:8080"),

    TREASURE_ENDPOINT("/locationserv/api/treasure"),
    CLUE_ENDPOINT("/locationserv/api/clue"),

    DIG_A_TREASURE_ENDPOINT(TREASURE_ENDPOINT.getPath() + "/digAHole"),
    DIG_A_CLUE_ENDPOINT(CLUE_ENDPOINT.getPath() + "/digAHole"),
    ;

    private final String path;

}