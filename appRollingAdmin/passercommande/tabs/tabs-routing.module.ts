import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

/*const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'menu',
        loadChildren: () => import('../menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'partenaire',
        loadChildren: () => import('../partenaire/partenaire.module').then(m => m.PartenairePageModule)
      },
    
      {
        path: '',
        redirectTo: '/tabs/menu',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/menu',
    pathMatch: 'full'
  }
];*/

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'typelivraison',
        loadChildren: () => import('../typelivraison/typelivraison.module').then(m => m.TypelivraisonPageModule)
      },
      {
        path: 'partenaire',
        loadChildren: () => import('../partenaire/partenaire.module').then(m => m.PartenairePageModule)
      },
    
      {
        path: '',
        redirectTo: '/tabs/typelivraison',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/typelivraison',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
