import { Component, OnInit } from '@angular/core';
import { CommandeClient } from 'src/models/commandesclient_model';
import { CommandesClientProvider } from 'src/providers/commandesclient_provider';
import { DetailCommande } from 'src/models/detailcommande_model';
import { Produit } from 'src/models/produit_model';
import { PopoverController, ActionSheetController, AlertController } from '@ionic/angular';
import { CommandesPartenairesProvider } from 'src/providers/commandespartenaires_provider';
import { LIEN_PATH_IMAGE_PARTENAIRE } from 'src/providers/config_bdd';

@Component({
  selector: 'app-listecommandesclients',
  templateUrl: './listecommandesclients.page.html',
  styleUrls: ['./listecommandesclients.page.scss'],
})
export class ListecommandesclientsPage implements OnInit {

 allCommandesPayees: CommandeClient[];

 allCommandesNonPayees: CommandeClient[];

 allCommandesNontraitees: CommandeClient[];

 allCommandesFinie: CommandeClient[];

 //detail d'une commande
 allDetailCommande: DetailCommande;

 //récupérer le nom des produits d'une commande : 
 nomProduitsCommande: Produit;

 commande : CommandeClient[];
 public listepartenaires : any =[];
 path = LIEN_PATH_IMAGE_PARTENAIRE;
 
 constructor(
   private commandeProvider: CommandesClientProvider,
   private actionSheetCtrl : ActionSheetController,
   private commandesPartenairesProvider :CommandesPartenairesProvider,
   private alertCtrl: AlertController,
 ) {
   this.getAllPartenaires(); 
   this.getAllCommandesNonTraitees();  
   this.getAllCommandesPayees();
   this.getAllCommandesNonPayees();
    

 }

 ngOnInit() {
 }

 ionViewWEillEnter() {   
  this.allCommandesPayees =[];
  this.allCommandesNonPayees =[];
  this.allCommandesNontraitees =[]
  this.getAllPartenaires();
  this.getAllCommandesPayees();
  this.getAllCommandesNonPayees();
  this.getAllCommandesNonTraitees();
 }
 refresh() {    
  this.allCommandesPayees =[];
  this.allCommandesNonPayees =[];
  this.allCommandesNontraitees =[]
  this.getAllPartenaires();
  this.getAllCommandesPayees();
  this.getAllCommandesNonPayees();
  this.getAllCommandesNonTraitees();

 }
 //récupérer tous les partenaires
 getAllPartenaires(){
  this.commandesPartenairesProvider.getAllPartenaires().subscribe(
     res => {            
       if(res == false){
         console.log("la commande n'a pas été ajouté !! ");
       }else{  
        // this.listepartenaires = res as string[];      
         this.listepartenaires  =<[]>res;
         console.log("this.listepartenaires : ",   this.listepartenaires);
       }
     }
   );
 }
 private tab: any = [];
 annulerCommande(idcom) {   
   this.commandeProvider.deleteCommandeId(idcom).subscribe(
     res => {
       if (res == false) {
         console.log("Commande n'est pas annulée ");
       } else {
      this.refresh();
         console.log("Commande est annulée avec succés ");
       }
     }
   );
   
 }
 //Récupérer les commandes payées
 getAllCommandesPayees() {
   this.commandeProvider.getAllCommandesPayees().subscribe(
     res => {
       if (res['succes'] == false) {
         console.log("Aucune commande payée.");
       } else {
         let sou = <[]>res;
         this.allCommandesPayees = res;
         console.log("---- Commandes payées : --------");
         console.log(" ->", this.allCommandesPayees);

       }
     }
   )
 }
  //Récupérer les commandes non payées
  getAllCommandesNonPayees() {
    this.commandeProvider.getAllCommandesNonPayees().subscribe(
      res => {
        if (res['succes'] == false) {
          console.log("Aucune commande non payée.");
        } else {
          let sou = <[]>res;
          this.allCommandesNonPayees = res;
          console.log("---- Commandes non payées : --------");
          console.log(" ->", this.allCommandesNonPayees);
 
        }
      }
    )
  }
  //Récupérer les commandes non traitées avec problème
 getAllCommandesNonTraitees() {
  this.commandeProvider.getAllCommandesNonTraitees().subscribe(
    res => {
      if (res['succes'] == false) {
        console.log("Aucune commande non traitée.");
      } else {
        let sou = <[]>res;
        this.allCommandesNontraitees = res;
        console.log("---- Commandes non traitées : --------");
        console.log(" ->", this.allCommandesNontraitees);

      }
    }
  )
}
 pathimage(nompartenaire){
   //alert(nompartenaire);
   let img :any;
this.listepartenaires.forEach(element => {
 if(element.nom == nompartenaire){
   img = element.image;
 }
});
return img;
 }
/***************************************
 * Vérifier  
 */


 private detailTab: any = [];

 getAllProduitCommande(idcom: number) {
   this.commandeProvider.getAllProduitCommande(idcom).subscribe(
     res => {
       if (res == false) {
         console.log("Aucun produit pour la commande : " + idcom);
       } else {
         this.allDetailCommande = res;
         this.detailTab = res;
         console.log("/// Commande n° : ", this.allDetailCommande.idcom);

         for (let i = 0; i < this.detailTab.length; i++) {
           const element = this.detailTab[i].idproduit;
           console.log("Detail Tab > id produit : " + element)

         }

         //console.log(">> All detail produit commande >>>>>>>>" + this.detailTab[].idproduit);
         this.getNameProduitsCommande(this.allDetailCommande[0].idproduit);


       }
     }
   )
 }

 getNameProduitsCommande(idproduit: number) {
   this.commandeProvider.getNameProduitsCommande(idproduit).subscribe(
     res => {
       if (res == false) {
         console.log("pas de produit");
       } else {
         this.nomProduitsCommande = res;
         console.log("+*+*+* Nom produit commande : ", this.nomProduitsCommande);
       }
     }
   )
 }

 /*************************************
  * Modifier le statut d'une commande *
  *************************************/
 async presentAlertAdresseCommande(commande) {
// commande = JSON.stringify(commande.adresseLivraison);
   
console.log("adresse liv :"+ commande);
   const alert = await this.alertCtrl.create({
     cssClass: 'my-custom-class',
     header: 'Adresse de livraison :',
     subHeader: "N°: "+commande[0].idcom,
     message:
     "<p>"+commande[0].nomclient+" "+commande[0].prenomclient+"</p>"+
     "<p>"+commande[0].adresseclient+"\n"+commande[0].npaclient+"</p>"+
     "<p>"+commande[0].villeclient+"</p>"+
     "<p>"+commande[0].telephoneclient+"</p>"+
     "<p>"+commande[0].emailclient+"</p>"+
     "<p> Code d'entrée :"+commande[0].codeentree+"</p>"+
     "<p> Etage :"+commande[0].etageclient+"</p>"+
     "<p> Commentaire :"+commande[0].commentaire+"</p>"
     
   ,
    

     buttons: [
       {
         text: 'Ok',
         handler: () => { //takes the data 
         
         }
       }
     ]
   });

   await alert.present();
 }
 async updateStatut(commande : CommandeClient) {
  
   let entete :any;
   if(commande.idtypeclient ==0){ entete =commande.idcom;}else{entete =commande.idclient;}
   const actionSheet = await this.actionSheetCtrl.create({
     header: 'Commande n° ' + entete,
     cssClass: 'my-custom-class',
     buttons: [{
       text: 'Adresse commande',
       role: 'destructive',
       icon: 'person',
       handler: () => {
         let stat='Adresse commande';         
        // alert(JSON.stringify(commande.adresseLivraison));
         this.presentAlertAdresseCommande(commande.adresseLivraison);
     
         
       }
     },
        
     {
       text: 'Commande non traitée ',
       icon: 'settings',
       handler: () => {
         console.log('Favorite clicked');
        this.updateCommandeIsPaidStatut(commande.idcom,-1);
       }       
     },
     {
      text: 'Commande payée ',
      icon: 'settings',
      handler: () => {
        console.log('Favorite clicked');  
       this.updateCommandeIsPaidStatut(commande.idcom,1);
      }
    },
    {
      text: 'Commande non payée ',
      icon: 'settings',
      handler: () => {
        console.log('Favorite clicked');  
       this.updateCommandeIsPaidStatut(commande.idcom,0);
      }
    },
    {
      text: 'Supprimer la commande',
      role: 'destructive',
      icon: 'trash',
      handler: () => {    
        this.presentAlertConfirmerSuppressionCommande(commande);
            
      }
    }, {
       text: 'Cancel',
       icon: 'close',
       role: 'cancel',
       handler: () => {
         console.log('Cancel clicked');
       }
     }]
   });
   await actionSheet.present();
 }

  async presentAlertConfirmerSuppressionCommande(commande) {
    let entete :any;
   if(commande.idtypeclient ==0){ entete =commande.idcom;}else{entete =commande.idclient;}
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: 'Suppression de commande' ,
          subHeader: 'Voulez-vous supprimer  la commande n° ' + entete,
    
          buttons: [
            {
              text: 'Annuler',
              role: 'cancel'
            },
            {
              text: 'OK',
              handler: () => { //takes the data 
                this.updateCommandeIsPaidStatut(commande.idcom,-2)
                //this.annulerCommande(commande.idcom);              
              }
            }
          ]
        });
    
        await alert.present();
      }
    
//update Statut paiement de la commade
updateCommandeIsPaidStatut(idcom,statutPaid){
 this.commandeProvider.updateCommandeIsPaidStatut(idcom,statutPaid).subscribe(
   res => {   
     console.log("le statut du paiement de la commande est changée !!");
     this.refresh();
   }
 );
}
adresselivraisonCommandesPayees(i){
  alert(JSON.stringify(this.allCommandesPayees[i].adresseLivraison));
}
adresselivraisonCommandesNonPayees(i){
  alert(JSON.stringify(this.allCommandesNonPayees[i].adresseLivraison));
}
adresselivraisonCommandesNonTraitees(i){
  alert(JSON.stringify(this.allCommandesNontraitees[i].adresseLivraison));                            
}
}
