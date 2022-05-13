import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from '@angular/fire/auth';
import { collection, collectionData, addDoc, Firestore, getDoc, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../app/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ChatWithF';
  chats: Array<any> = [];
  ngOnInit() {
    //goi ham khi mo page
    this.getAllMessage();
    getAuth().onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }
      //login thanh cong
      console.log(user)
      this.checkUser = true;
      this._user = user;
      if(await this.checkFirstLogin() == false){
        this.createUser()
      }else{
        return;
      }

    })
  }

  message = "";
  checkUser = false;

  _user:User | null = null;

  constructor(private Firestore: Firestore, public AuthService: AuthService) {

  }

  getAllMessage() {
    collectionData(collection(this.Firestore, 'messages')).subscribe((value) => {
      // console.log(value)
      this.chats = value
    })
  }

  sendMessage() {
    console.log(this.message);
    addDoc(collection(this.Firestore, 'messages'), {
      mess: this.message
    })
  }

  async login() {
   this._user = await (await this.AuthService.login()).user;
   console.log(this._user)
  }

  async logout() {
    await this.AuthService.logout();
    this.checkUser = false;
    this._user = null;
  }

  async checkFirstLogin() {
    if (!this._user) {
      return false;
    }
    else {
      let userProfile = await getDoc(doc(this.Firestore, 'users/' + this._user.uid));
      console.log(userProfile)
      return userProfile.exists();
    }
  }

   

  async createUser(){
    const userRef = doc(this.Firestore, 'users/' + this._user?.uid);
    setDoc(userRef, {
      uid: this._user?.uid,
      displayName: this._user?.displayName,
      email: this._user?.email,
      avatar: this._user?.photoURL
    })
  }

  

}




