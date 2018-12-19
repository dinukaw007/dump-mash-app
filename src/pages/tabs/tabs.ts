import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
import { RecyclersPage } from '../recyclers/recyclers';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RecyclersPage;
  // tab2Root = RecyclersPage;
  // tab3Root = AboutPage;
  // tab4Root = ContactPage;
  
  constructor() {

  }
}
