import { Injectable } from '@angular/core';
import {collection, collectionData, addDoc, Firestore, getDoc} from '@angular/fire/firestore';
import {signInWithPopup, GoogleAuthProvider, Auth} from '@angular/fire/auth'
import { signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private dichVuCuaFA: Auth
  ) {

   }
  login(){
    return signInWithPopup(this.dichVuCuaFA, new GoogleAuthProvider());
   }

  async logout(){
    await signOut(this.dichVuCuaFA);
  }

  
}
