import { Component, OnInit } from '@angular/core';
import { panier } from 'src/app/app.component';
import { CommandesClientProvider } from 'src/providers/commandesclient_provider';
import { Storage } from '@ionic/storage';
import { CommandesPartenairesProvider } from 'src/providers/commandespartenaires_provider';
import { AlertController, ModalController } from '@ionic/angular';
import { ClientProvider } from 'src/providers/clients_provider';
import { Router } from '@angular/router';
@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})

export class PanierPage implements OnInit {
  listeProduits :any;
  total :any;
  // variable locale : 
  idclient: number;
  nomclient: string;
  prenomclient: string;
  adresseclient: string;
  npaclient: number;
  villeclient: string;
  paysclient: string;
  telephoneclient: string;
  emailclient: string;
  motdepasseclient : string;
  demandeur :any;

  constructor(  private commandesClientProvider :CommandesClientProvider,  
    private commandesPartenairesProvider :CommandesPartenairesProvider,
    private storage: Storage,  
    private alertCtrl: AlertController,
    private clientProvider: ClientProvider,
    private router: Router,
    private modal : ModalController
    ) { 
this.demandeur = panier.demandeur;
    //modif jorge
 //Récupérer les données stockées localement concernant le client actuellement connecté.
 this.getStorageID();
 this.getStorageNomClient();
 this.getStoragePrenomClient();
 this.getStorageAdresseClient();
 this.getStorageNpaClient();
 this.getStorageVilleClient();
 this.getStoragePaysClient();
 this.getStorageTelephoneClient();
 this.getStorageEmailClient();
 this.getStorageMotDePasseClient();
    //fin modif
    var myData = JSON.stringify({ panier: panier });
   // alert("Panier :"+myData);
    console.log("Panier :",myData);
    if(panier.listeProduits[0].quantiteproduit==0 && panier.listeProduits.length>1){
     // alert("panier[0] true");
      panier.listeProduits.splice(0,1);
    }
    else{
     // alert("panier[0] false");
    }
    this.listeProduits =panier.listeProduits;
    this.total=panier.totalcom;
  }

  ngOnInit() {
  }
  deletearticle(index){
    panier.totalcom -=(panier.listeProduits[index].prixproduit +panier.listeProduits[index].prixtotalSupplement);
    panier.listeProduits.splice(index,1);
    console.log("article à supprimer est :",panier);
    this.total = panier.totalcom;
  }
  deletesupplement(index, j){
   // panier.totalcom = panier

   panier.listeProduits[index].prixtotalSupplement -=
    (panier.listeProduits[index].listeSupplements[j].prixcomposant*panier.listeProduits[index].quantiteproduit);
    panier.totalcom -= (panier.listeProduits[index].listeSupplements[j].prixcomposant*panier.listeProduits[index].quantiteproduit);
    
  
    panier.listeProduits[index].listeSupplements.splice(j,1)
   // console.log("article à supprimer est :",panier.listeProduits.splice(index,1));
    this.total = panier.totalcom;
    console.log("delete supplement  :",panier);
  }
  deleteARetirer(index, j) {
    panier.listeProduits[index].listeARetirer.splice(j, 1);
    console.log("delete  a retirer  :", panier);
  }
  commander(){
    //panier partenaire
    if(panier.demandeur==1){
     
    this.passerCommandePartenaire();
  }
    //panier particulier
    else{
     
      this.passerCommandeParticulier();
    }
  }
  async presentAlertChoixSignInSignUp() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Vous n\êtes pas connecté.',
      subHeader: 'Dirigez-vous vers la page de connexion pour continuer.',
      
      buttons: [
        {
          text: 'Page de connexion',
          handler: () =>{ //takes the data 
            this.router.navigate(['login']);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  passerCommandeParticulier(){
   
    //panier.listeProduits.splice(0,1)
    console.log("Le panier est :", panier);
    //let totalCommande  = 0.00;

    /*panier.listeProduits.forEach(produit=>{
      totalCommande +=  ((produit.prixproduit) +  (produit.prixtotalSupplement));

    });*/
    //panier.totalcom = (totalCommande);
    this.commandesClientProvider.addPanier(panier).subscribe(
      res => {
        panier.listeProduits.splice(0,  panier.listeProduits.length)
        panier.totalcom=0.00;
        panier.demandeur =0;
        this.total = 0.00;
        
        if(res == false){
          console.log("Aucun composant à pizza ");
        }else{
         // panier.listeProduits.splice(0,  panier.listeProduits.length)
        //  this.allComposants = res;
       //   console.log("Composants : ", this.allComposants);
        }
      }
    );
  }
  passerCommandePartenaire(){     
    console.log("Le panier partenaire est :", panier);  
     
    this.commandesPartenairesProvider.addcommandePartenaire(panier,localStorage.getItem('idCom'),
    localStorage.getItem('idpartenaire'),
    localStorage.getItem('nompartenaire')).subscribe(
      res => {
        panier.listeProduits.splice(0, panier.listeProduits.length)
        panier.totalcom=0.00;
        panier.demandeur =0;
        this.total = 0.00;
        localStorage.removeItem('idCom');
        localStorage.removeItem('idpartenaire');
        localStorage.removeItem('nompartenaire');
        
        if(res == false){
          console.log("Aucun composant à pizza ");
        }else{      
        }
      }
    );

   
  }

/***********************************
   * [ Storage : données stockées]
   */
  getStorageID() {
    this.storage.get('idclient').then((val) => {
      console.log("ID : ", val);
      this.idclient = val;
    });
  }

  getStorageNomClient() {
    this.storage.get('nomclient').then((val) => {
      console.log('Nom client : ', val);
      this.nomclient = val;
    });
  }

  getStoragePrenomClient() {
    this.storage.get('prenomclient').then((val) => {
      console.log('Prenom client  : ', val);
      this.prenomclient = val;
    });
  }

  getStorageAdresseClient() {
    this.storage.get('adresseclient').then((val) => {
      console.log('Adresse client : ', val);
      this.adresseclient = val;
    });
  }

  getStorageNpaClient() {
    this.storage.get('npaclient').then((val) => {
      console.log('NPA client : ', val);
      this.npaclient = val;
    });
  }

  getStorageVilleClient() {
    this.storage.get('villeclient').then((val) => {
      console.log('Ville client : ', val);
      this.villeclient = val;
    });
  }

  getStoragePaysClient() {
    this.storage.get('paysclient').then((val) => {
      console.log('Pays client : ', val);
      this.paysclient = val;
    });
  }

  getStorageTelephoneClient() {
    this.storage.get('telephoneclient').then((val) => {
      console.log('Téléphone client : ', val);
      this.telephoneclient = val;
    });
  }

  getStorageEmailClient() {
    this.storage.get('emailclient').then((val) => {
      console.log('Email client : ', val);
      this.emailclient = val;
    });
  }

  getStorageMotDePasseClient() {
    this.storage.get('motdepasseclient').then((val) => {
      console.log('Mot de passe client : ', val);
      this.motdepasseclient = val;
    });
  }
 

}
