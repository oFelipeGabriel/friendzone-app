import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiProvider } from "../../providers/api/api";
import { UserStorageProvider } from "../../providers/user-storage/user-storage";

interface User{
  _id: string;
  nome: string;
  email: string;
}
@IonicPage()
@Component({
  selector: 'page-aceites',
  templateUrl: 'aceites.html',
})
export class AceitesPage {
  user: User;
  grupos: Array<any>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiProvider,
    private userStorage: UserStorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AceitesPage');
    this.userStorage.getUser().then(async user => {
      this.user = await user
      await this.buscaAceites();
    })
  }
  buscaAceites(){
    this.api.requestGet('grupo/buscaAceites', {id: this.user._id}).then(async res => {
      let get = await res;
      if(get.status==200){
        this.grupos = get.data
      }
    })
  }
  getData(data){
    if(data){
      return this.convertDateToUTC(new Date(data));
    }else{
      return null
    }
  }
  convertDateToUTC(date) { 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}
}
