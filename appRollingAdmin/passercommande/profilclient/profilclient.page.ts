import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { ClientProvider } from 'src/providers/clients_provider';
import { Router } from '@angular/router';
import { Client } from 'src/models/client_model';
import { panier } from 'src/app/app.component';

@Component({
  selector: 'app-profilclient',
  templateUrl: './profilclient.page.html',
  styleUrls: ['./profilclient.page.scss'],
})
export class ProfilclientPage implements OnInit {

  public dataNewClient: any;

  public clientSignUp: FormGroup;
  demandeur:any;
  typelivraison:any;

  constructor(
    private menuCtrl: MenuController,
    private clientProvider: ClientProvider,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.demandeur = panier.demandeur;
    this.typelivraison = panier.idtypelivraison;
    console.log("panier in profilclient:",panier);
    console.log("typelivraison:",this.typelivraison);
    this.dataNewClient = new Client(null, null, null, null, null, null, null, null, null, null,null);

    this.clientSignUp = formBuilder.group({
      nomclient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      prenomclient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      adresseclient: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      npaclient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9]*'), Validators.required])],
      villeclient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      paysclient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      telephoneclient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9 ]*'), Validators.required])],
      emailclient: ['', Validators.compose([ Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      motdepasseclient: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[0-9a-z-A-Z@.#*$!?&+-/ ]*'), Validators.required])]
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

addClient(){
  if(panier.demandeur == 1){
    this.addNewClientPartenaire();
  }
  else{
    this.addNewClient();
  }
}

  addNewClient() {

    console.log("add new client value nom : " + this.clientSignUp.value.nomclient);

   if (
      this.clientSignUp.value.nomclient == "" ||
      this.clientSignUp.value.prenomclient == "" ||
      this.clientSignUp.value.adresseclient == "" ||
      this.clientSignUp.value.npaclient == "" ||
      this.clientSignUp.value.villeclient == "" ||
      this.clientSignUp.value.paysclient == "" ||
      this.clientSignUp.value.telephoneclient == "" ||
      this.clientSignUp.value.emailclient == "" ||
      this.clientSignUp.value.motdepasseclient == ""
      ) {
      alert("Vous n'avez pas saisi toutes les informations. Veuillez saisir tous les champs.");
    } else {
      this.clientProvider.addNewClient(
        /*
        this.dataNewClient.nomclient,
        this.dataNewClient.prenomclient,
        this.dataNewClient.adresseclient,
        this.dataNewClient.npaclient,
        this.dataNewClient.villeclient,
        this.dataNewClient.paysclient,
        this.dataNewClient.telephoneclient,
        this.dataNewClient.emailclient,
        this.dataNewClient.motdepasseclient
        */
       this.clientSignUp.value.nomclient,
       this.clientSignUp.value.prenomclient,
       this.clientSignUp.value.adresseclient,
       this.clientSignUp.value.npaclient,
       this.clientSignUp.value.villeclient,
       this.clientSignUp.value.paysclient,
       this.clientSignUp.value.telephoneclient,
     
       this.clientSignUp.value.emailclient,
       this.clientSignUp.value.motdepasseclient,
       1
      ).subscribe(res => {
        if(res == false){
          console.log("Erreur d'insertion d'un nouveau client ");
        }else{      
          //alert("id client est :"+ res);
          console.log("id client est :"+ res);
          panier.idclient = res;
        }
      });
      this.router.navigate(['/menu']);
    }
    }
    addNewClientPartenaire() {

      console.log("add new client value nom : " + this.clientSignUp.value.nomclient);
  
      if (
        this.clientSignUp.value.nomclient == "" ||
        this.clientSignUp.value.prenomclient == "" ||
        this.clientSignUp.value.adresseclient == "" ||
        this.clientSignUp.value.npaclient == "" ||
        this.clientSignUp.value.villeclient == "" ||
        this.clientSignUp.value.paysclient == "" ||
        this.clientSignUp.value.telephoneclient == "" //||
       // this.clientSignUp.value.emailclient == "" ||
       // this.clientSignUp.value.motdepasseclient == ""
        ) {
        alert("Vous n'avez pas saisi toutes les informations. Veuillez saisir tous les champs.");
      } else {
        this.clientProvider.addNewClient(
          /*
          this.dataNewClient.nomclient,
          this.dataNewClient.prenomclient,
          this.dataNewClient.adresseclient,
          this.dataNewClient.npaclient,
          this.dataNewClient.villeclient,
          this.dataNewClient.paysclient,
          this.dataNewClient.telephoneclient,
          this.dataNewClient.emailclient,
          this.dataNewClient.motdepasseclient
          */
         this.clientSignUp.value.nomclient,
         this.clientSignUp.value.prenomclient,
         this.clientSignUp.value.adresseclient,
         this.clientSignUp.value.npaclient,
         this.clientSignUp.value.villeclient,
         this.clientSignUp.value.paysclient,
         this.clientSignUp.value.telephoneclient,       
         "",
         "",1
        ).subscribe(res => {
          if(res == false){
            console.log("Erreur d'insertion d'un nouveau client ");
          }else{      
            //alert("id client est :"+ res);
            console.log("id client est :"+ res);
            panier.idclient = res;
          }
        });
        this.router.navigate(['/menu']);
      }
      }

PasserAuMenu(){
panier.idclient="";
this.router.navigate(['/menu']);
}

}
