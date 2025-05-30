import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './Store/shop/shop.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShopComponent }

];
