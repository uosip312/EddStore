import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListItemComponent } from './components/admin/list-item/list-item.component';
import { DetailsItemComponent } from './components/details-item/details-item.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './shared/page404/page404.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ListUserComponent } from './components/admin/list-user/list-user.component';
import { ItemModalComponent } from './components/modal/item-modal/item-modal.component';
import { UserModalComponent } from './components/modal/user-modal/user-modal.component';
import { SearchPipe } from './pipe/search.pipe';
import { VerifyEmailComponent } from './components/users/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './components/users/forgot-password/forgot-password.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    DetailsItemComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    FooterComponent,
    SidebarComponent,
    ListUserComponent,
    ItemModalComponent,
    UserModalComponent,
    SearchPipe,
    VerifyEmailComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth, AngularFirestore, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
