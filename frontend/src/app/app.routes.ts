import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateHuntComponent } from './create-hunt/create-hunt.component';
import { ShopComponent } from './Store/shop/shop.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RankingComponent } from './ranking/ranking.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-hunt', component: CreateHuntComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'ranking', component: RankingComponent }

];
