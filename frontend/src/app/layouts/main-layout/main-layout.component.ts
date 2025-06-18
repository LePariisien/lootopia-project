import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterModule } from '@angular/router';
import { LoadingPageComponent } from "../../pages/loading-page/loading-page.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    RouterModule,
    LoadingPageComponent,
    CommonModule
],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  loading: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
