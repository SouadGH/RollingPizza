import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeClient } from 'src/models/commandesclient_model';
import { CommandesClientProvider } from 'src/providers/commandesclient_provider';

@Component({
  selector: 'app-detailcommande',
  templateUrl:'./detailcommande.page.html',
  styleUrls: ['./detailcommande.page.scss'],
})
export class DetailcommandePage implements OnInit {

  commande : CommandeClient;
  commandeStockee: CommandeClient;

  allProduitsCommande : any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private commandesProvider: CommandesClientProvider
  ) {
   

    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.commande = this.router.getCurrentNavigation().extras.state.commande;      
        this.commandeStockee=  this.commande;
        localStorage.setItem('commandeStockee',JSON.stringify(this.commandeStockee)) ; 
       
        console.log("******localStorage.getItem('commandeStockee') Constructor en question : " ,JSON.parse(JSON.stringify(localStorage.getItem('commandeStockee'))));
      }
      else{ this.commande =<CommandeClient>(JSON.parse(((localStorage.getItem('commandeStockee')))));
        console.log("localStorage.getItem('commandeStockee') Constructor en question : " ,JSON.parse((JSON.stringify(localStorage.getItem('commandeStockee')))));}
     // if(this.commande == null){alert("this.commande est null il faut revenir à mes commandes!!")}
    //  this.showCommande(this.commande);
    console.log(" this.commandeStockee Constructor en question : " , this.commande);
    });
  /*  this.getAllComposantsPizza();
    this.getPrixGarnituresSupplementaire();
    this.getProduitsCombos(26);
    this.getProduitsOffres(27);*/
   }

  ngOnInit() {
    //console.log("GET_COMMANDE_ : " , this.commande);
    if(this.commande == null){
      this.commande =<CommandeClient>(JSON.parse(((localStorage.getItem('commandeStockee')))));
      console.log(" hello "+JSON.stringify(localStorage.getItem('commandeStockee')));
   //   this.commande= Array(localStorage.getItem('commandeStockee'));
     // this.router.navigate(['mescommandes']);
    }
      else{
        this.commande =<CommandeClient>(JSON.parse(((localStorage.getItem('commandeStockee')))));
        this.commandeStockee=  this.commande;
        localStorage.setItem('commandeStockee',JSON.stringify(this.commande)) ;        
      }
      console.log("La commande Constructor en question : " , this.commande);
  }

 
}
