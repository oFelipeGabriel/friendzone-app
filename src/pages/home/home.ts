import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';

import { GrupoPage } from "../grupo/grupo";
import { NovoGrupoPage } from "../novo-grupo/novo-grupo";
import { UserStorageProvider } from "../../providers/user-storage/user-storage";
import { ApiProvider } from "../../providers/api/api";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface User{
  _id: string;
  nome: string;
  email: string;
}
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user: User;
  grupos: Array<any>;
  convites: Array<any>;
  constructor(
    public app: App,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    private userStorage: UserStorageProvider,
    private api: ApiProvider) {
      events.subscribe('grupo:atualizado', () => {
        this.buscaGrupos(this.user._id);
        this.buscaConvites(this.user.email) 
      });
      this.pushsetup();
  }
  ionViewDidLoad() {
    this.userStorage.getUser().then(async user => {
      this.user = user 
      this.buscaGrupos(this.user._id);
      await this.buscaConvites(this.user.email) 
    })
  }

  pushsetup() {
    // const options: PushOptions = {

    //   android: {
    //     senderID: '763988571681',
    //     vibrate: true,
    //     forceShow: true
    //   },
    //   ios: {
    //     alert: "true",
    //     badge: true,
    //     sound: "false"
    //   }
    // };

    // const pushObject: PushObject = this.push.init(options);

    // pushObject.on("registration").subscribe((registration: any) => {
    //   console.log("registration", registration)
    // });

    // pushObject.on("notification").subscribe((notification: any) => {
    //   console.log("notification", notification)
    // });
  }

  
  
  async buscaGrupos(id){
    this.api.requestGet('grupo/busca', {id}).then(res => {
      this.grupos = res.data
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
  async buscaConvites(email){
    this.api.requestGet('grupo/buscaConvites', {email}).then(async res => {
      let grupos = await res.data
      this.convites = grupos;
    })
  }
  verGrupo(grupo){
    this.app.getRootNav().push(GrupoPage, {grupo})
  }
  novo(){
    this.app.getRootNav().push(NovoGrupoPage, {user: this.user})
  }
}
