import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserStorageProvider } from "../../providers/user-storage/user-storage";
import { ApiProvider } from "../../providers/api/api";

interface User{
  nome: string;
  email: string;
}
@IonicPage()
@Component({
  selector: 'page-convites',
  templateUrl: 'convites.html',
})
export class ConvitesPage {
  user: User;
  convites: Array<any>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private userStorage: UserStorageProvider,
    private api: ApiProvider
  ) {
  }
  
  ionViewDidLoad() {
    this.userStorage.getUser().then(async user => {
      this.user = user
      await this.buscaConvites(user.email)
    })
  }
  async buscaConvites(email){
    this.api.requestGet('grupo/buscaConvites', {email}).then(async res => {
      let grupos = await res.data
      this.convites = grupos;
    })
  }
  async aceitar(grupo){
    console.log(grupo._id)
    let body = {
      grupoId: grupo._id, 
      email: this.user.email
    }
    await this.api.requestPost('grupo/addConfirmacao', body).then(res => {
      console.log('salvo', res)
    })
  }
}
