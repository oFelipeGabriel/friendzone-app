import { Injectable } from '@angular/core';
import axios from 'axios';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  // BASE_PATH: string = 'http://192.168.15.37:3333/'
  BASE_PATH: string = 'https://friendzone-back.herokuapp.com';
  HEADERS: any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  constructor() {
    console.log('Hello ApiProvider Provider');
  }

  async requestGet(url: string, params: any){
    try{
      let get = await axios({
        method: 'get',
        url: this.BASE_PATH + url,
        headers: this.HEADERS,
        params
      }).then(async res =>{
        return await res
      });
      return await get;
    }catch(erro){
      console.log(erro)
      return erro
    }
  }
  async requestPost(url: string, data: any){
    try{
      let post = await axios({
        method: 'post',
        url: this.BASE_PATH + url,
        headers: this.HEADERS,
        data
      }).then(async res =>{
        return await res
      });
      return await post;
    }catch(erro){
      console.log(erro)
      return erro
    }
  }
}
