import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GestionServiceService } from './services/gestion-service.service';


/*
    Modulos de Material
*/
import { ModulesModule } from './modules/modules.module';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    TablaComponent,
    ToolbarComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModulesModule,
    HttpClientModule,
  ],
  exports:[

    ],
  providers: [GestionServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
