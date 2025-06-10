import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    HeaderComponent,
    RouterModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
