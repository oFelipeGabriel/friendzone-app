import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { ApiProvider } from "../../providers/api/api";

/**
 * Generated class for the GrupoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html',
})
export class GrupoPage {
  grupo: any;
  email: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    private api: ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrupoPage');
    this.grupo = this.navParams.get('grupo')
  }
  enviaConvite(){
    let body = {
      grupoId: this.grupo._id,
	    email: this.email
    }
    this.api.requestPost('grupo/addUsuario', body).then(async res => {
      console.log(res)
      if(res.status==200){
        this.events.publish('grupo:atualizado')
        this.email = "";
        this.grupo = res.data
      }
      
    })
  }
  sortear(){
    
  }
}
