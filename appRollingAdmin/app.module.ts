import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { ListecommandesclientsPageModule } from './commandesclients/listecommandesclients/listecommandesclients.module';
import { ListeproduitPageModule } from './produits/listeproduit/listeproduit.module';
import { DetailsproduitPageModule } from './produits/detailsproduit/detailsproduit.module';
import { DetailsclientPageModule } from './clients/detailsclient/detailsclient.module';
import { ListeingredientsPageModule } from './ingredients/listeingredients/listeingredients.module';
import { ClientProvider } from 'src/providers/clients_provider';
import { ProduitProvider } from 'src/providers/produits_provider';
import { ListetypeproduitPageModule } from './typeproduit/listetypeproduit/listetypeproduit.module';
import { ComposantPizzaProvider } from 'src/providers/composantpizza_provider';
import { ModifieringredientPage } from './ingredients/modifieringredient/modifieringredient.page';
import { CommandesClientProvider } from 'src/providers/commandesclient_provider';
import { Camera } from '@ionic-native/camera/ngx';
import { CommandesPartenairesProvider } from 'src/providers/commandespartenaires_provider';
import { IonicStorageModule } from '@ionic/storage';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetailsproduitPage } from './produits/detailsproduit/detailsproduit.page';
import { MiscService } from './services/misc.service';
import { EmployesProvider } from 'src/providers/employers_provider';



//Les providers : 


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,

    HttpClientModule,
   // DetailsproduitPage,

    //commandes clients
    ListecommandesclientsPageModule,
    DetailsclientPageModule,

    //Produit
    ListeproduitPageModule,
    DetailsproduitPageModule,

    //Type produit
    ListetypeproduitPageModule,

    //Ingrédients
    ListeingredientsPageModule,
    IonicStorageModule.forRoot(),
    

  ],
  providers: [
    Camera,
    StatusBar, 
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    ClientProvider, 
    ProduitProvider,
    CommandesClientProvider,
    CommandesPartenairesProvider,
    ComposantPizzaProvider,
    EmployesProvider,
    FormsModule, ReactiveFormsModule,
    MiscService
 
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
