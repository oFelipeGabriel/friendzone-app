import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ConvitesPage } from '../convites/convites';
import { AceitesPage } from "../aceites/aceites";
import { HomePage } from "../home/home";

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConvitesPage;
  tab3Root = AceitesPage
  tab4Root = ContactPage;

  constructor() {

  }
}
