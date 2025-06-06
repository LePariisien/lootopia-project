import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateHuntComponent } from './pages/create-hunt-page/create-hunt.component';
import { ShopComponent } from './Store/shop/shop.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RankingComponent } from './ranking/ranking.component';
import { ViewHuntsComponent } from './view-hunts/view-hunts.component';
import { HuntParticipationPageComponent } from './pages/hunt-participation-page/hunt-participation-page.component';
import { NotFoundComponent } from './pages/not-found-page/not-found.component';
import { ProfilPageComponent } from './profil-page/profil-page.component';
import { AuthGuard } from './guards/auth.guards';
import { VerifyComponent } from './verify/verify.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-hunt', component: CreateHuntComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'view-hunts', component: ViewHuntsComponent },
  { path: 'participation/:id', component: HuntParticipationPageComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
  { path: 'verify', component: VerifyComponent },
  {
    path: 'profile',
    component: ProfilPageComponent,
    canActivate: [AuthGuard] 
  },

];
