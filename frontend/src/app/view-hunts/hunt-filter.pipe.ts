import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'huntFilter', standalone: true })
export class HuntFilterPipe implements PipeTransform {
  transform(hunts: any[], search: string, difficulty: string, city: string): any[] {
    return hunts.filter(hunt => {
      const matchesSearch =
        !search ||
        hunt.name?.toLowerCase().includes(search.toLowerCase()) ||
        hunt.description?.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty =
        !difficulty || String(hunt.level) === difficulty;
      const matchesCity =
        !city ||
        hunt.treasure?.clues?.[0]?.address?.toLowerCase().includes(city.toLowerCase());
      return matchesSearch && matchesDifficulty && matchesCity;
    });
  }
}