import { Component, OnInit } from '@angular/core';
import { panier } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-typelivraison',
  templateUrl: './typelivraison.page.html',
  styleUrls: ['./typelivraison.page.scss'],
})
export class TypelivraisonPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }
  changetypelivraison(index){
panier.idtypelivraison =index;

panier.demandeur =0;
this.router.navigate(['profilclient']);
//this.router.navigate(['menu']);
  }
}
