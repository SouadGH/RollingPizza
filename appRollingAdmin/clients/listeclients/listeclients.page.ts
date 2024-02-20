import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { Client } from 'src/models/client_model';
import { ClientProvider } from 'src/providers/clients_provider';

@Component({
  selector: 'app-listeclients',
  templateUrl: './listeclients.page.html',
  styleUrls: ['./listeclients.page.scss'],
})
export class ListeclientsPage implements OnInit {
  @ViewChild('searchNom', {static: false}) searchNom: IonSearchbar;
  @ViewChild('searchPrenom', {static: false}) searchPrenom: IonSearchbar;
  @ViewChild('searchEmail', {static: false}) searchEmail: IonSearchbar;
  @ViewChild('searchPhone', {static: false}) searchPhone: IonSearchbar;
  allClients : Client[];
  allClientsFinale: Client[];
  //searchNom:any;
  constructor(
    private modalCtrl: ModalController,
    private clientProvider: ClientProvider,
    private router: Router
  ) { 
    this.getAllClients();
  }

  ngOnInit() {
  }

  getAllClients(){
    this.clientProvider.getAllClients().subscribe(
      res => {
        if(res == false){
          console.log("ERROR_NO_CLIENTS");
        }else{
          this.allClients = res; 
          this.allClientsFinale =res;
          console.log("LISTE_CLIENTS _: " , this.allClients);
        }
      }
    )
  }

  goDetail(client){
    let navigationExtras : NavigationExtras = {
      state : {
        client : client
      }
    };
    this.router.navigate(['../detailsclient'], navigationExtras);
  }
  async onSearchTerm(ev: CustomEvent) {
    const val = ev.detail.value;
    const inputsearchNom    = await (await this.searchNom.getInputElement()).value;
    const inputsearchPrenom = await (await this.searchPrenom.getInputElement()).value;
    const inputsearchEmail  = await (await this.searchEmail.getInputElement()).value;
    const inputsearchPhone  = await (await this.searchPhone.getInputElement()).value;
   
    
  
   this.allClients = this.allClientsFinale;
    if (inputsearchNom && inputsearchNom.trim() !== '') {  
      this.allClients = this.allClients.filter(term => {
       return (term.nomclient.toLowerCase().indexOf(inputsearchNom.trim().toLowerCase()) > -1 ) ;
      });  
       }

      if (inputsearchPrenom && inputsearchPrenom.trim() !== '') {  
        this.allClients = this.allClients.filter(term => {
        return  (term.prenomclient.toLowerCase().indexOf(inputsearchPrenom.trim().toLowerCase()) > -1) ;
        });    
    }

 if (inputsearchEmail && inputsearchEmail.trim() !== '') {  
      this.allClients = this.allClients.filter(term => {
        return (term.emailclient.toLowerCase().indexOf(inputsearchEmail.trim().toLowerCase()) > -1) ;
      });    
  }

  if (inputsearchPhone && inputsearchPhone.trim() !== '') {  
    this.allClients = this.allClients.filter(term => {
      return  (term.telephoneclient.toLowerCase().indexOf(inputsearchPhone.trim().toLowerCase()) > -1) ;
    });    
}
 
  }
  onSearchTermPrenom(ev: CustomEvent) {
    const val = ev.detail.value;
   this.allClients = this.allClientsFinale;
    if (val && val.trim() !== '') {
      this.allClients = this.allClients.filter(term => {
        return term.prenomclient.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }
  onSearchTermEmail(ev: CustomEvent) {
    const val = ev.detail.value;
   this.allClients = this.allClientsFinale;
    if (val && val.trim() !== '') {
      this.allClients = this.allClients.filter(term => {
        return term.emailclient.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }
  onSearchTermPhone(ev: CustomEvent) {
    const val = ev.detail.value;
   this.allClients = this.allClientsFinale;
    if (val && val.trim() !== '') {
      this.allClients = this.allClients.filter(term => {
        return term.telephoneclient.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }
}
