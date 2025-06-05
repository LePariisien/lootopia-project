import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateHuntComponent } from './pages/create-hunt-page/create-hunt.component';
import { ShopComponent } from './Store/shop/shop.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HuntParticipationPageComponent } from './pages/hunt-participation-page/hunt-participation-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-hunt', component: CreateHuntComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'participation/:id', component: HuntParticipationPageComponent },
];
