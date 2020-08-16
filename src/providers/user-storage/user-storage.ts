import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable()
export class UserStorageProvider {

  private userStorage: Storage = new Storage({
    name: "__friendzone",
    storeName: "usuario",
    driverOrder: ["indexeddb", "sqlite", "websql"]
  });

  constructor(
    public storage: Storage
    ) {
  }

  saveUser(user){
    return this.userStorage.set("user", user);
  }

  getUser(): Promise<any>{
    return this.userStorage.get("user")
  }
  clearUser(){
    return this.userStorage.clear();
  }

}
