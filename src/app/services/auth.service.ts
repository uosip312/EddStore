import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(private afsAuth: AngularFireAuth,
              private afs: AngularFirestore,
              public router: Router,
              public ngZone: NgZone) {
                this.afsAuth.authState.subscribe(user => {
                  if (user) {
                    this.userData = user;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                  } else {
                    localStorage.setItem('user', null);
                    JSON.parse(localStorage.getItem('user'));
                  }
                });
    }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then((result) => {
          this.updateUserData(result.user);
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message);
        });
    });
  }
  registerUser(email: string, pass: string) {
    return this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
    .then((result) => {
      /* Call the send verificationMail() function when new user sign up and returns promise */
      this.SendVerificationMail();
      this.updateUserData(result.user);
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error.message);
    });
  }
  // Send email verification when new user sign up
  SendVerificationMail() {
    return this.afsAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['user/verify-email']);
    });
  }
  ForgotPassword(passwordResetEmail) {
    return this.afsAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Correo para resetear contraseña enviado, revisa tu correo');
    }).catch((error) => {
      window.alert(error.message);
    });
  }
  // Return true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  isAuth() {
    // tslint:disable-next-line: no-shadowed-variable
    return this.afsAuth.authState.pipe(map(auth => auth));
  }
  loginGoogleUser() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  AuthLogin(provider) {
    return this.afsAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.updateUserData(result.user);
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error.message);
    });
  }
  /* Setting up user data when sign int with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service  */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: UserInterface = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      roles: {reader: true},
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  // Sign out
  logoutUser() {
    return this.afsAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['user/login']);
    });
  }
  // To create a new collection with the user data.
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserInterface = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      roles: {
        reader: true
      }
    };
    return userRef.set(data, { merge: true });
  }
  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
}
