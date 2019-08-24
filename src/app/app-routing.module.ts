import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsItemComponent } from './components/details-item/details-item.component';
import { ListItemComponent } from './components/admin/list-item/list-item.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './shared/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import { ListUserComponent } from './components/admin/list-user/list-user.component';
import { ForgotPasswordComponent } from './components/users/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/users/verify-email/verify-email.component';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'item/:id', component: DetailsItemComponent, canActivate: [AuthGuard] },
  { path: 'admin/list-item', component: ListItemComponent, canActivate: [AuthGuard]},
  { path: 'user/login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'user/register', component: RegisterComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'user/forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'user/verify-email', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'user/list-users', component: ListUserComponent, canActivate: [AuthGuard]},
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
