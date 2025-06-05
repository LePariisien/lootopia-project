package com.lootopia.lootopia.Dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@Data
@NoArgsConstructor
@ToString
public class DigResultDto {

    public List<ClueDto> clues;

    public List<TreasureDto> treasures;

}