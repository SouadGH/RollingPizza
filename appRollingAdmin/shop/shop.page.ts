import { Component, OnInit } from '@angular/core';
import { CommandesClientProvider } from 'src/providers/commandesclient_provider';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  segment = 'profil';
  /**les horaires */
  horairesShop: any = [];
  allInfosShop: any = []; 

  constructor(private commandeClientProvider: CommandesClientProvider,) { }

  ngOnInit() {
    this.getHorairesIdShop();
    this. getInformationIdShop();
  }
  ///***horaires */
  getHorairesIdShop() {

    this.commandeClientProvider.getHorairesShop().subscribe(
      res => {
        if (res == false) {
          console.log("Il n'y a aucune commande dans votre compte.");
        } else {
          this.horairesShop = <[]>res;
          console.log("this.allCommandesClient :" + JSON.stringify(this.horairesShop));
          console.log("this.horairesShop.length  :" + this.horairesShop.length);
        }
      }
    );

  }
  ///***Information Shop */
  getInformationIdShop() {
    this.commandeClientProvider.getShopID(1).subscribe(
      res => {
        if (res == false) {
          console.log("Il n'y a aucune commande dans votre compte.");
        } else {
          this.allInfosShop = <[]>res;
          console.log("this.allInfosShop :" + JSON.stringify(this.allInfosShop));
          console.log("this.allInfosShop.length  :" + this.allInfosShop.length);
        }
      }
    );

  }

}
