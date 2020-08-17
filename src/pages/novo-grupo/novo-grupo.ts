import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from "../tabs/tabs";
import { ApiProvider } from "../../providers/api/api";


interface User{
  _id: string;
  nome: string;
  email: string;
}
@IonicPage()
@Component({
  selector: 'page-novo-grupo',
  templateUrl: 'novo-grupo.html',
})
export class NovoGrupoPage {
  user: User;
  nome: string;
  dataEntrega: Date;
  TODAY: string = new Date().toISOString();
  MAX: string = new Date(new Date().setFullYear(new Date().getFullYear()+2)).toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoGrupoPage');
    this.user = this.navParams.get('user');
  }
  cadastar(){
    let body = {
      nome: this.nome,
      dataEntrega: this.dataEntrega,
      usuario: this.user._id
    }
    this.api.requestPost('grupo/cadastro', body).then(async res =>{
      if(res.status==200){
        this.navCtrl.setRoot(TabsPage)
      }
    })    
  }

}
