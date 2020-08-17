import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";

import { UserStorageProvider } from "../../providers/user-storage/user-storage";
// import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";
import { CadastroPage } from "../cadastro/cadastro";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string;
  constructor(
    public navCtrl: NavController, 
    private userStorage: UserStorageProvider,
    private api: ApiProvider) {

  }
  ionViewWillEnter(){
    this.userStorage.getUser().then(user => {
      if(user){
        this.email = user.email
        this.entrar()
      }      
    })
  }
  entrar(){
    if(this.email){
      this.api.requestGet('usuario/busca', {email: this.email}).then(async res =>{
        if(res.status==200){
          if(res.data.length>0){
            this.userStorage.saveUser(await res.data[0])
            this.navCtrl.setRoot(TabsPage)
          }else{
            this.navCtrl.push(CadastroPage, {email: this.email})
          }
          
        }
      }) 
    }
      
  }
}
