import { Component, OnInit } from '@angular/core';
import { CommandesPartenairesProvider } from 'src/providers/commandespartenaires_provider';
import { NavigationExtras, Router } from '@angular/router';
import { panier } from 'src/app/app.component';

@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.page.html',
  styleUrls: ['./partenaire.page.scss'],
})
export class PartenairePage implements OnInit {
  public listepartenaires : any =[];
  
   
  public partenaire :any ;
  public idCom:any ;
  public total :any;  
  public date :Date;
  constructor(private commandesPartenairesProvider :CommandesPartenairesProvider,
    private router: Router) { }

  ngOnInit() {
  this.getAllPartenaires();
 
  }
  onChangePartenaire($event,i){
    //alert("partenaire event );
    console.log("partenaire :"+ this.partenaire);
    console.log(`i :${i}`);
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
  
  commanderArchive(){   
   // this.idCom="XRv-OP";
 //   this.total=50.79;
   // this.partenaire ="Smood";
    console.log("this.partenaire : ",  this.idCom,this.total, this.listepartenaires[this.partenaire].idpartenaire,this.listepartenaires[this.partenaire].nom);

   this.commandesPartenairesProvider.addcommandePartenaire(this.idCom,this.total, this.listepartenaires[this.partenaire].idpartenaire,this.listepartenaires[this.partenaire].nom).subscribe(
      res => {
      
        
        if(res == false){
          console.log("la commande n'a pas été ajouté !! ");
        }else{
          this.idCom ="";
          this.total ="";
          this.partenaire ="";
         // panier.listeProduits.splice(0,  panier.listeProduits.length)
        //  this.allComposants = res;
       //   console.log("Composants : ", this.allComposants);
        }
      }
    );
  }
  commander(){
    //this.router.navigate(['/detailproduit']);
    //alert("idtypeproduit "+this.allTypeProduits[this.selectedTypeProduitIdx].idtypeproduit);
    let navigationExtras : NavigationExtras = {
      state : {
        idCom : this.idCom,
        idpartenaire:this.listepartenaires[this.partenaire].idpartenaire,
        nompartenaire :this.listepartenaires[this.partenaire].nom
       
     }
    };
    panier.demandeur =1;
    panier.idtypelivraison =3;
    localStorage.setItem('idCom', this.idCom);
    localStorage.setItem('idpartenaire',  this.listepartenaires[this.partenaire].idpartenaire);
    localStorage.setItem('nompartenaire',  this.listepartenaires[this.partenaire].nom);
   // alert("navigationExtras "+navigationExtras);
   // this.router.navigate(['menu'], navigationExtras);
    this.router.navigate(['profilclient'], navigationExtras);
    
  }
}
