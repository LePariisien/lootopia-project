import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login-page/login.component';
import { RegisterComponent } from './pages/register-page/register.component';
import { CreateHuntComponent } from './pages/create-hunt-page/create-hunt.component';
import { ShopComponent } from './Store/shop/shop.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RankingComponent } from './ranking/ranking.component';
import { ViewHuntsComponent } from './view-hunts/view-hunts.component';
import { HuntParticipationPageComponent } from './pages/hunt-participation-page/hunt-participation-page.component';
import { NotFoundComponent } from './pages/not-found-page/not-found.component';
import { HuntDetailPageComponent } from './pages/hunt-detail-page/hunt-detail-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'create-hunt', component: CreateHuntComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'ranking', component: RankingComponent },
      { path: 'view-hunts', component: ViewHuntsComponent },
      { path: 'participation/:id', component: HuntParticipationPageComponent },
      { path: 'hunt/:id', component: HuntDetailPageComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
