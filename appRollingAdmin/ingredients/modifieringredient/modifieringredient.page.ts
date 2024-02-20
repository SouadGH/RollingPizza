import { Component, OnInit, Input } from '@angular/core';
import { ComposantPizzaProvider } from 'src/providers/composantpizza_provider';
import { MenuController, NavController } from '@ionic/angular';
import { ComposantPizza } from 'src/models/composantpizza_model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifieringredient',
  templateUrl: './modifieringredient.page.html',
  styleUrls: ['./modifieringredient.page.scss'],
})

export class ModifieringredientPage implements OnInit {
  idcomposant: any;
  allCategorieComposant: any;
  nomcomposant:any;
  prixcomposant:any;
  categoriecomposant:any;
  constructor(private composantProvider: ComposantPizzaProvider, private menuCtrl: MenuController, 
    public activatedRoute :ActivatedRoute, private navCtrl: NavController,public router: Router) { 
   // this.idcomposant = navParams.get('idcomposant');
   this.idcomposant = this.activatedRoute.snapshot.paramMap.get('idcomposant');
   this.getDetailComposant(this.idcomposant);
    this.getAllCategorieComposant() ;
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  getAllCategorieComposant() {
    this.composantProvider.getAllCategorieComposant().subscribe(res => {
      this.allCategorieComposant = res;
      console.log("categories composants :", this.allCategorieComposant);
    }
    );
  }
  getDetailComposant(idcomposant){
    this.composantProvider.getDetailComposant(idcomposant).subscribe(res=>{
      console.log("res  :"+ res);
      if(res == false){
        alert("ERREUR!");
      }else{
      let resultat = <[]>res;
      resultat.forEach(element=>{
        console.log("element :",element);
      
       this.nomcomposant = element['nomcomposant'];
       this.categoriecomposant = element['categoriecomposant'];
       this.prixcomposant = element['prixcomposant'];
     
      });
        
     // console.log(" this.dataTypeProduit.nomcategorie  :"+  resultat);
     //   this.navCtrl.back();
      }}
    );
  }
  UpdateComposant(){   
    this.composantProvider.updateComposant(this.idcomposant, this.nomcomposant, this.categoriecomposant, this.prixcomposant)
   .subscribe(res=> {
       if(res == false){
         alert("ERREUR !");
       }else{
         this.navCtrl.back();
       }
     });
 
 
   }
   Annuler(){
    this.router.navigate(['./listeingredients']);
  }
}
