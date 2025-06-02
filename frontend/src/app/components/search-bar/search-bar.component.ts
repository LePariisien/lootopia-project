import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  imports: [CommonModule, FormsModule],
})
export class SearchBarComponent {
  search: string = '';
  filter: string = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.search);
  }
  setFilter(f: string) {
    this.filter = f;
    this.filterChange.emit(this.filter);
  }
}
