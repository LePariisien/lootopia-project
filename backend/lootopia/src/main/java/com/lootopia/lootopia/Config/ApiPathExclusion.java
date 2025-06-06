package com.lootopia.lootopia.Config;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ApiPathExclusion {

    SWAGGER_API_V2_DOCS("/v2/api-docs"),
    SWAGGER_RESOURCE_CONFIGURATION("/swagger-resources/configuration/ui"),
    SWAGGER_RESOURCES("/swagger-resources"),
    SWAGGER_RESOURCES_SECURITY_CONFIGURATION("/swagger-resources/configuration/security"),
    SWAGGER_UI_HTML("swagger-ui.html"),
    WEBJARS("/webjars/**"),
    SWAGGER_UI("/swagger-ui/**"),
    SWAGGER_API_V3_DOCS("/v3/api-docs/**"),
    SWAGGER_CONFIGURATION("/configuration/**"),
    SWAGGER("/swagger*/**"),
    ERROR("/error"),
    FAVICON("/favicon.ico"),
    HEALTH_CHECK("/health-check"),
    ACTUATOR("/actuator/**"),
    TEST("/api/test/all"),
    TEST_LINK_LOCATION("/api/test/linkLocation"),
    AUTH("/api/auth/**"),
    REFRESH_TOKEN("/api/token/refresh-token"),
    TEST_TREASURE_HUNT("/api/treasure-hunts"),
    TEST_TREASURE_HUNT_ALL("/api/treasure-hunt/all"),
    VERIFY_MAIL("/verify"),
    GET_ALL_PLAYERS("/api/player/all"),
    GET_PLAYER_COUNT("/api/player/count"),
    GET_TREASURE_HUNT_COUNT("/api/treasure-hunt/count");

    private final String path;

}