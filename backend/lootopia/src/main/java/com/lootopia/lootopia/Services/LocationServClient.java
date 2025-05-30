package com.lootopia.lootopia.Services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.lootopia.lootopia.Config.ApiPath;
import com.lootopia.lootopia.Dtos.ClueDto;
import com.lootopia.lootopia.Dtos.TreasureDto;

@Service
public class LocationServClient {

        private final WebClient webClient = WebClient.builder()
                        .baseUrl(ApiPath.GATEWAY_PATH.getPath())
                        .build();

        public TreasureDto createTreasure(TreasureDto treasureDto) {
                return webClient.post()
                                .uri(ApiPath.TREASURE_ENDPOINT.getPath())
                                .header("Content-Type", "application/json")
                                .bodyValue(treasureDto)
                                .retrieve()
                                .bodyToMono(TreasureDto.class)
                                .block();
        }

        public List<TreasureDto> digATreasure(UUID treasureId, double latitude, double longitude, double distance) {
                return webClient.get()
                                .uri(ApiPath.DIG_A_TREASURE_ENDPOINT.getPath() + "?treasureId=" + treasureId
                                                + "&longitude=" + longitude
                                                + "&latitude=" + latitude
                                                + "&distance=" + distance)
                                .header("Content-Type", "application/json")
                                .retrieve()
                                .bodyToFlux(TreasureDto.class)
                                .collectList()
                                .block();
        }

        public List<ClueDto> digAClue(UUID treasureId, double latitude, double longitude, double distance) {
                return webClient.get()
                                .uri(ApiPath.DIG_A_CLUE_ENDPOINT.getPath() + "?treasureId=" + treasureId
                                                + "&longitude=" + longitude
                                                + "&latitude=" + latitude
                                                + "&distance=" + distance)
                                .header("Content-Type", "application/json")
                                .retrieve()
                                .bodyToFlux(ClueDto.class)
                                .collectList()
                                .block();
        }

        public void checkGatewayHealth() {
                String result = webClient.get()
                                .uri("/actuator/health")
                                .retrieve()
                                .bodyToMono(String.class)
                                .block();
                System.out.println("Gateway health: " + result);
        }
}
