import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Employers } from 'src/models/employers_model';
import { EmployesProvider } from 'src/providers/employers_provider';


@Component({
  selector: 'app-modifieremployer',
  templateUrl: './modifieremployer.page.html',
  styleUrls: ['./modifieremployer.page.scss'],
})
export class ModifieremployerPage implements OnInit {

  employe: Employers;

  constructor(
    private router: Router,
    private modalCtrl : ModalController,
    private employerProvider: EmployesProvider
  ) { 
    this.employe = new Employers(null, null, null, null, null);
  }

  ngOnInit() {
  }

  update(){
    this.employerProvider.updateEmploye(
      this.employe.idemploye,
      this.employe.nomemploye, 
      this.employe.prenomemploye, 
      this.employe.codeemploye, 
      this.employe.isadmin
    ).subscribe( res =>{
      if(res == false){
        console.log("ERROR_UPDATE_FAILED");
      }
      else{
        this.annuler();
      }
    })
  }

  annuler(){
    this.modalCtrl.dismiss();
  }
}
