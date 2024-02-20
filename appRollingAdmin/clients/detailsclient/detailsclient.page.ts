import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { CommandeClient } from 'src/models/commandesclient_model';
import { ClientProvider } from 'src/providers/clients_provider';
import { CommandesClientProvider } from 'src/providers/commandesclient_provider';


@Component({
  selector: 'app-detailsclient',
  templateUrl: './detailsclient.page.html',
  styleUrls: ['./detailsclient.page.scss'],
})
export class DetailsclientPage implements OnInit {
  @ViewChild('searchDate', {static: false}) searchDate: IonSearchbar;
  @ViewChild('searchIdCom', {static: false}) searchIdCom: IonSearchbar;
  client :any; 

  allCommandesClient: CommandeClient[];
  allCommandesClientFinale: CommandeClient[];

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private clientProvider: ClientProvider,
    private commandeProvider: CommandesClientProvider
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.client = this.router.getCurrentNavigation().extras.state.client;
      }

      this.getClientCommandes(this.client.idclient);
    });//route.queryParams

  }

  ngOnInit() {
  }


  getClientCommandes(idclient){
    console.log("IDCLIENT_PRESENT: " + idclient);
    this.commandeProvider.getAllCommandesClientIdClient(idclient).subscribe(res => {
      if ( res == false){
        console.log("ERROR_NO_CUSTOMER_ORDERS");
      }else{
        this.allCommandesClient = res ; 
        this.allCommandesClientFinale =res;
        console.log("ALL_ORDERS_CUSTOMERS_ID : " , this.allCommandesClient);
      }
    })
  }

  goDetail(commande){
    let navigationExtras : NavigationExtras = {
      state : {
        commande : commande
      }
    };

    this.router.navigate(['../../detailcommande/'], navigationExtras);
  }
  onSearchTermarchive(ev: CustomEvent) {
    const val = ev.detail.value;
   this.allCommandesClient = this.allCommandesClientFinale;
    if (val && val.trim() !== '') {
      this.allCommandesClient = this.allCommandesClient.filter(term => {
   
        return String(term.datecom).toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }

  async onSearchTerm(ev: CustomEvent) {
    const val = ev.detail.value;
    const inputsearchIdCom    = await (await this.searchIdCom.getInputElement()).value;
    const inputsearchsearchDate= await (await this.searchDate.getInputElement()).value;
   
   
   
   this.allCommandesClient = this.allCommandesClientFinale;
   
    if (inputsearchIdCom && inputsearchIdCom.trim() !== '') {  
      this.allCommandesClient = this.allCommandesClient.filter(term => {
       return (String(term.idcom).toLowerCase().indexOf(inputsearchIdCom.trim().toLowerCase()) > -1 ) ;
      });  
       }

      if (inputsearchsearchDate && inputsearchsearchDate.trim() !== '') {  
        this.allCommandesClient = this.allCommandesClient.filter(term => {
        return String(term.datecom).toLowerCase().indexOf(inputsearchsearchDate.trim().toLowerCase()) > -1;
      
      });    
    }
 
 




  }
}
