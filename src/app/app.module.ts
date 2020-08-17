import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Push } from "@ionic-native/push";
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from "../pages/home/home";
import { CadastroPage } from "../pages/cadastro/cadastro";
import { AceitesPage } from "../pages/aceites/aceites";
import { ConvitesPage } from '../pages/convites/convites';
import { GrupoPage } from "../pages/grupo/grupo";
import { NovoGrupoPage } from "../pages/novo-grupo/novo-grupo";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserStorageProvider } from '../providers/user-storage/user-storage';
import { ApiProvider } from '../providers/api/api';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    TabsPage,
    HomePage,
    CadastroPage,
    ConvitesPage,
    AceitesPage,
    GrupoPage,
    NovoGrupoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: "__friendzone",
      driverOrder: ["indexeddb", "sqlite", "websql"]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    TabsPage,
    HomePage,
    CadastroPage,
    ConvitesPage,
    AceitesPage,
    GrupoPage,
    NovoGrupoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserStorageProvider,
    ApiProvider,
    Push
  ]
})
export class AppModule {}
