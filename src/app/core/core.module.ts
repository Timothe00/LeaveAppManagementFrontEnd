import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
//import { SideNavComponent } from './components/side-nav/side-nav.component';


@NgModule({
  declarations: [
    //SideNavComponent
  ],

  imports: [
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ]
})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
