import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { UserStorageProvider } from "../../providers/user-storage/user-storage";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public app: App, private userStorage: UserStorageProvider) {

  }
  ionViewWillLoad(){
    this.userStorage.clearUser().then(()=>{
      this.app.getRootNav().push(LoginPage)
    })
  }

}
