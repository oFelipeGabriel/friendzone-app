import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from "../tabs/tabs";

import { ApiProvider } from "../../providers/api/api";
import { UserStorageProvider } from "../../providers/user-storage/user-storage";

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  nome: string;
  email: string;
  camisa: string;
  calca: string;
  calcado: string;
  hobby: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiProvider,
    private userStorage: UserStorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
    this.email = this.navParams.get('email')
  }
  cadastrar(){
    let user = {
      nome: this.nome,
      email: this.email,
      tamanhoCamisa: this.camisa,
      tamanhoCalca: this.calca,
      tamanhoSapato: this.calcado,
      hobby: this.hobby
    }
    this.api.requestPost('usuario/cadastro', user).then(async res => {
      if(res.status==200){
        let user = await res.data.usuario
        console.log("salvo", user)
        this.userStorage.saveUser(user);
        this.navCtrl.setRoot(TabsPage)
      }
    })
  }

}
