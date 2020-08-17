import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { Push, PushObject, PushOptions } from "@ionic-native/push";
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
    private push: Push,
    private userStorage: UserStorageProvider,
    private api: ApiProvider) {
      events.subscribe('grupo:atualizado', () => {
        this.buscaGrupos(this.user._id);
        this.buscaConvites(this.user.email) 
      });
      
  }
  ionViewDidLoad() {
    this.userStorage.getUser().then(async user => {
      this.user = user 
      this.pushsetup();
      this.buscaGrupos(this.user._id);
      await this.buscaConvites(this.user.email) 
    })
  }

  pushsetup() {
    const options: PushOptions = {

      android: {
        senderID: '763988571681',
        vibrate: true,
        forceShow: true
      },
      ios: {
        alert: "true",
        badge: true,
        sound: "false"
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on("registration").subscribe((registration: any) => {
      let id = registration.registrationId;
      this.atualizaFirebase(id);
    });

    pushObject.on("notification").subscribe((notification: any) => {
      console.log("notification", notification)
    });
  }

  async atualizaFirebase(id){
    let body = {
      idUsuario: this.user._id,
      idFirebase: id
    }
    await this.api.requestPost('usuario/atualizaFirebase', body).then(res => {
      console.log("atualizou firebase", res)
    })
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
  getSorteado(grupo){
    let id = this.user._id;
      let filter = grupo.sorteados.filter(sorteado => {
        if(sorteado.entrega){
          return sorteado.entrega._id===id
        }        
      })
      return filter[0].recebe.nome    
  }
}
