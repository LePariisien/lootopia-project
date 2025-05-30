import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateHuntComponent } from './create-hunt/create-hunt.component';
import { ShopComponent } from './Store/shop/shop.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'create-hunt', component: CreateHuntComponent },
  { path: 'shop', component: ShopComponent }

];
