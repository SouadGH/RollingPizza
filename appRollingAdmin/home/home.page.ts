import { Component, OnInit } from '@angular/core';
import { CommandeClient } from 'src/models/commandesclient_model';
import { CommandesClientProvider } from 'src/providers/commandesclient_provider';
import { DetailCommande } from 'src/models/detailcommande_model';
import { Produit } from 'src/models/produit_model';
import { PopoverController, ActionSheetController, AlertController, MenuController } from '@ionic/angular';
import { CommandesPartenairesProvider } from 'src/providers/commandespartenaires_provider';
import { LIEN_PATH_IMAGE_PARTENAIRE } from 'src/providers/config_bdd';
import { Storage } from '@ionic/storage';
//import { isNumeric } from 'jquery';
import { Subject } from 'rxjs';

import { Howl } from 'howler';
import { Router } from '@angular/router';

export interface Track{
  name: string;
  path:string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  idemploye: number;
  nomemploye: string;
  prenomemploye: string;
  isadmin: number;
  playlist: Track[] = [
    {
        name: 'bipNouvelleCommande',
        path:'./assets/audio/file.mp3'
    }
      ];
  private unsubscribe: Subject<[]> = new Subject();
  data: any;
  interval: any;

  //récupérer les commandes en preparation 
  allCommandePreparation: CommandeClient[];

  allCommandesNouvelles: CommandeClient[];

  allCommandesPretRetirer: CommandeClient[];

  allCommandesEnLivraison: CommandeClient[];

  allCommandesFinie: CommandeClient[];

  //detail d'une commande
  allDetailCommande: DetailCommande;

  //récupérer le nom des produits d'une commande : 
  nomProduitsCommande: Produit;

  commande : CommandeClient[];
  public listepartenaires : any =[];
  path = LIEN_PATH_IMAGE_PARTENAIRE;
  activeTrack :Track = null;
  player: Howl = null;
  isPlaying =false;
  constructor(
    private commandeProvider: CommandesClientProvider,
    private actionSheetCtrl : ActionSheetController,
    private commandesPartenairesProvider :CommandesPartenairesProvider,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    private storage: Storage,
    private router : Router
   
  ) {
    if(localStorage.getItem('idemploye') != null){
      this.menuCtrl.enable(true);
    
     
    }
    else{
      this.router.navigate(['/login']);
      this.menuCtrl.enable(false);
    }
  /*  this.getAllPartenaires();
    this.getAllCommandesNouvelles();
    this.getAllCommandesPreparationTest();  
    this.getAllCommandesPretARetirer();
    this.getAllCommandesEnLivraison();*/
    this.getStorageIdEmploye();
    this.getStorageNomEmploye();
    this.getStoragePrenomEmploye();
    this.getStorageIsAdmin();
    
    /*if(this.isadmin!= null){
      this.menuCtrl.enable(true);
    }else{
      this.menuCtrl.enable(false);
      this.router.navigate(['/login']);
    }*/
   
  }
  /******* */
  start(track :Track){
    //alert("start play in new cmd !!");
    if(this.player){
      this.player.stop();
    }
    this.player =new Howl({
      src :[track.path],

      onplay:()=>{
        console.log("onplay");
        this.isPlaying =true;
        this.activeTrack =track;
      },
      onend:()=>{
        console.log("onend");
      }
    });
    this.player.play();
  }

  toggleTrack(pause){
      this.isPlaying = !pause;
      if(pause){
          this.player.pause();
      }else{
          this.player.play();
      }
  }
  next(){}
  rev(){}
  seek(){}
  updateProgress(){}
/************* */
  ngOnInit() {
   /* this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/file.mp3');.then((res) => {
      console.log(res);
      alert("coucou");
      }, (err) => {
      console.log(err);
      alert("coucou erreur !!!"+err);
      });*/
     
   
  /*  this.commandeProvider.data$.subscribe(data => { // subscribe once to the data stream
      this.allCommandesNouvelles = data;
  })*/

 /* this.getAllPartenaires();
  this.getAllCommandesNouvelles();
  this.getAllCommandesPreparationTest();  
  this.getAllCommandesPretARetirer();
  this.getAllCommandesEnLivraison();*/

    this.refreshData();
    if(this.interval){
      clearInterval(this.interval);
  }
    this.interval = setInterval(() => { 
     // console.log("settime 5000 appelé");
     //alert("this.allCommandesNouvelles.length  in ngoninit: "+this.allCommandesNouvelles.length);
        this.refreshData(); 
        if( this.allCommandesNouvelles.length>0){
          //envoi bip sonore
         // this.start(this.playlist[0]);
        }
    }, 30000);

   
    this.getStorageIdEmploye();
    this.getStorageNomEmploye();
    this.getStoragePrenomEmploye();
    this.getStorageIsAdmin();
   // this.commandeProvider.data$.unsubscribe(this.unsubscribe);
           
  }
  refreshData(){
   
    this.getStorageIdEmploye();
    this.getStorageNomEmploye();
    this.getStoragePrenomEmploye();
    this.getStorageIsAdmin();
    this.refresh();
  //  this.nativeAudio.unload('uniqueId1');
  //  this.commandeProvider.updateData(); // simply signal for the service to update its data stream
}
ngOnDestroy() {
  this.unsubscribe.next();
  this.unsubscribe.complete();
  clearInterval(this.interval);
}
  ionViewWEillEnter() {
  // this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/file.mp3').then(onSuccess=>{alert("sucesss sonore");}, onError=>{alert("erreur sonore:"+onError);});
    
    //this.nativeAudio.preloadComplex('uniqueId2', 'assets/audio/file.mp3', 1, 1, 0).then(onSuccess, onError);
    this.getStorageIdEmploye();
    this.getStorageNomEmploye();
    this.getStoragePrenomEmploye();
    this.getStorageIsAdmin();
    
    /*this.allCommandesNouvelles =[];
    this.allCommandePreparation =[];
    this.allCommandesPretRetirer =[];
    this.allCommandesEnLivraison =[];*/
    this.getAllPartenaires();
    this.getAllCommandesNouvelles();
    this.getAllCommandesPreparationTest();
    this.getAllCommandesPretARetirer();
    this.getAllCommandesEnLivraison();
    //this.getAllCommandesPreparation();
  }
  /*ionViewWillLeave(){
   // this.nativeAudio.unload('uniqueId1');
  }*/
  refresh() {  
  //  this.play();  
    this.allCommandesNouvelles =[];
    this.allCommandePreparation =[];
    this.allCommandesPretRetirer =[];
    this.allCommandesEnLivraison =[];
    this.getAllPartenaires();
    this.getAllCommandesNouvelles();
    this.getAllCommandesPreparationTest();
    this.getAllCommandesPretARetirer();
    this.getAllCommandesEnLivraison();
    this.getStorageIdEmploye();
    this.getStorageNomEmploye();
    this.getStoragePrenomEmploye();
    this.getStorageIsAdmin();
    //this.getAllCommandesPreparation();
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
  getStorageIdEmploye() {
    this.storage.get('idemploye').then((val) => {
      this.idemploye = val;
    
    });
  }
  getStorageNomEmploye() {
    this.storage.get('nomemploye').then((val) => {
      this.nomemploye = val;
    })
  }
  getStoragePrenomEmploye() {
    this.storage.get('prenomemploye').then((val) => {
      this.prenomemploye = val;
    });
  }
  getStorageIsAdmin() {
    this.storage.get('isadmin').then((val) => {
      this.defineIsAdmin(val);
    });
  }
  defineIsAdmin(isadmin) {
    this.isadmin = isadmin;
    console.log("********* defineisadmin home : " + this.isadmin);
  }

  //Récupérer les nouvelles commandes qui arrivent
  getAllCommandesNouvelles() { 
    this.commandeProvider.getAllCommandesNouvelleWithProduits().subscribe(
      res => {
        if (res['succes'] == false) {
          console.log(" taille new res==false: ", this.allCommandesNouvelles.length);
          console.log("Aucune Nouvelle commande .");
         
        } else {
          console.log(" taille new : ", this.allCommandesNouvelles.length);
          let sou = <[]>res; this.start(this.playlist[0]);
          this.commandeProvider.data$.next(res);
          this.commandeProvider.data$.subscribe(data => { // subscribe once to the data stream
            this.allCommandesNouvelles = data;
        })
       // this.nativeAudio.play('uniqueId1');
      
        //test bip sonore si nouvelles commandes
       // console.log(" taille new : ", this.allCommandesNouvelles.length);
         // this.allCommandesNouvelles = res;
          console.log("---- Nouvelles commandes : --------");
          console.log(" ->", this.allCommandesNouvelles);

        }
      }
    )
    
  }
 
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
  getAllCommandesPreparationTest() {
    this.commandeProvider.getAllCommandesPreparationWithProduits().subscribe(
      res => {
        if (res['succes'] == false) {
          console.log("Aucune commande en préparation.");
        } else {
          let sou = <[]>res;
          this.allCommandePreparation = res;
          console.log("---- Commandes en préparation : --------");
          console.log(" ->", this.allCommandePreparation);

        }
      }
    )
  }

  //Commandes clients prête à retirer, avec produits
  getAllCommandesPretARetirer() {
    this.commandeProvider.getAllCommandesPretARetirerWithProduits().subscribe(
      res => {
        if (res['succes'] == false) {
          console.log("Aucune commande prête à retirer.");
        } else {
          let sou = <[]>res;
          this.allCommandesPretRetirer = res;
          console.log("---- Commandes en pret à retirer : --------");
          console.log(" ->", this.allCommandesPretRetirer);

        }
      }
    )
  }


  //Commandes clients prête à retirer, avec produits
  getAllCommandesEnLivraison() {
    this.commandeProvider.getAllCommandesEnLivraisonWithProduits().subscribe(
      res => {
        if (res['succes'] == false) {
          console.log("Aucune commande en livraison.");
        } else {
          let sou = <[]>res;
          this.allCommandesEnLivraison = res;
          console.log("---- Commandes en livraison: --------");
          console.log(" ->", this.allCommandesEnLivraison);

        }
      }
    )
  }



  getAllCommandesPreparation() {
    this.commandeProvider.getAllCommandesPreparation().subscribe(
      res => {
        if (res['succes'] == false) {
          console.log("Aucune commande en préparation.");
        } else {
          this.allCommandePreparation = res;
          console.log("---- Commandes en préparation : --------");
          console.log(" ->", this.allCommandePreparation);
          console.log("--------------------------------------------------------")
          //console.log("ID COM PREPA : ", this.allCommandePreparation.idcom);
          //this.getAllProduitCommande(this.allCommandePreparation.idcom);

          this.tab = res;

          console.log("--------- Tab content -----------")
          console.log(this.tab[0].idcom);

          for (let i = 0; i < this.tab.length; i++) {
            const element = this.tab[i].idcom;
            console.log("/// const element : " + element);

            this.getAllProduitCommande(this.tab[i].idcom);
          }
        }
      }
    )
  }

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
    

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Adresse de livraison :',
      subHeader: "N°:"+commande[0].idcom,
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
    /*  ,{
        text: 'Supprimer commande',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          let stat='Nouvelle commande';
          //this.updateToEnPreparation(commande.idcom);
          this.annulerCommande(commande.idcom);
        
         
      
          
        }
      },*/{
        text: 'Nouvelle commande',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          let stat='Nouvelle commande';
          //this.updateToEnPreparation(commande.idcom);
          this.updateStatutCommande(commande,stat);
        }
      }, {
        text: 'En préparation',
        icon: 'share',
        handler: () => {
          let stat='En préparation';
          //this.updateToEnPreparation(commande.idcom);
          this.updateStatutCommande(commande,stat);
        
        }
      }, {
        text: 'Prêt à retirer',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
          let stat='Prêt à retirer';
          //this.updateToEnPreparation(commande.idcom);
          this.updateStatutCommande(commande,stat);
  
          
        }
      }, {
        text: 'En livraison',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
          let stat='En livraison';
          //this.updateToEnPreparation(commande.idcom);
          this.updateStatutCommande(commande,stat);
         
        }
        
      },
      {
        text: 'Livrée',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
          let stat='Livree';
          //this.updateToEnPreparation(commande.idcom);
          this.updateStatutCommande(commande,stat);
         
        }
        
      }, 
      {
        text: 'Commande non traitée ',
        icon: 'settings',
        handler: () => {
          console.log('Favorite clicked');
          let stat='Livree';
          //this.updateToEnPreparation(commande.idcom);
          //this.annulerCommande(commande.idcom);
         this.updateCommandeIsPaidSatut(commande.idcom,-1);
        }
        
      },{
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

  //update to EnPreparation 
  updateToEnPreparation(idcom){
   // alert("Commande en préparation !");
    this.commandeProvider.updateCommandeToEnPreparation(idcom).subscribe(
      res => {
       
      }
    );
  }
//update Statut commade
updateStatutCommande(commande,statut){
 // alert("je suis en update de statut");
  let entete :any;
    if(commande.idtypeclient ==0){ 
      this.commandeProvider.updateStatutCommande(commande.idcom,statut).subscribe(
        res => {
         // alert("update client normal");
          this.allCommandesNouvelles= [];
        this.allCommandePreparation= [];
        this.allCommandesPretRetirer=[];
        this.allCommandesEnLivraison= [];
        this.getAllCommandesNouvelles();
        this.getAllCommandesPreparationTest();
        this.getAllCommandesPretARetirer();
        this.getAllCommandesEnLivraison();
        }
      );
    }
    
    else{

      this.commandesPartenairesProvider.updateStatutCommande(commande.idcom,statut).subscribe(
        res => {
      //    alert("update partenaire");
          this.allCommandesNouvelles= [];
        this.allCommandePreparation= [];
        this.allCommandesPretRetirer=[];
        this.allCommandesEnLivraison= [];
        this.getAllCommandesNouvelles();
        this.getAllCommandesPreparationTest();
        this.getAllCommandesPretARetirer();
        this.getAllCommandesEnLivraison();
        }
      );
    }
 
}

//update Statut paiement de la commade
 updateCommandeIsPaidSatut(idcom,statutPaid){
  this.commandeProvider.updateCommandeIsPaidStatut(idcom,statutPaid).subscribe(
    res => {   
      console.log("le statut du paiement de la commande est changée !!");
      this.refresh();
    }
  );
}
adresselivraisonNouvellesCommandes(i){
  alert(JSON.stringify(this.allCommandesNouvelles[i].adresseLivraison));
}
}
