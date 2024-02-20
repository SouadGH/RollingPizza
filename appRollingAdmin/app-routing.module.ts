import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'listeclients',
    loadChildren: () => import('./clients/listeclients/listeclients.module').then( m => m.ListeclientsPageModule)
  },
  {
    path: 'detailsclient',
    loadChildren: () => import('./clients/detailsclient/detailsclient.module').then( m => m.DetailsclientPageModule)
  },
  {
    path: 'detailsproduit',
    loadChildren: () => import('./produits/detailsproduit/detailsproduit.module').then( m => m.DetailsproduitPageModule)
  },
  {
    path: 'listeproduit',
    loadChildren: () => import('./produits/listeproduit/listeproduit.module').then( m => m.ListeproduitPageModule)
  },
  {
    path: 'listeingredients',
    loadChildren: () => import('./ingredients/listeingredients/listeingredients.module').then( m => m.ListeingredientsPageModule)
  },
  {
    path: 'ajouteringredient',
    loadChildren: () => import('./ingredients/ajouteringredient/ajouteringredient.module').then( m => m.AjouteringredientPageModule)
  },
  {
    path: 'listetypeproduit',
    loadChildren: () => import('./typeproduit/listetypeproduit/listetypeproduit.module').then( m => m.ListetypeproduitPageModule)
  },
  {
    path: 'ajoutertypeproduit',
    loadChildren: () => import('./typeproduit/ajoutertypeproduit/ajoutertypeproduit.module').then( m => m.AjoutertypeproduitPageModule)
  },  
  {
    path: 'listecommandesclients',
    loadChildren: () => import('./commandesclients/listecommandesclients/listecommandesclients.module').then( m => m.ListecommandesclientsPageModule)
  },
  {
    path: 'ajouterproduit',
    loadChildren: () => import('./produits/ajouterproduit/ajouterproduit.module').then( m => m.AjouterproduitPageModule)
  },
  {
    path: 'listecategories',
    loadChildren: () => import('./categories/listecategories/listecategories.module').then( m => m.ListecategoriesPageModule)
  },
  {
    path: 'ajoutercategorie',
    loadChildren: () => import('./categories/ajoutercategorie/ajoutercategorie.module').then( m => m.AjoutercategoriePageModule)
  },
  {
    path: 'ajoutercomposantpizza',
    loadChildren: () => import('./composantspizza/ajoutercomposantpizza/ajoutercomposantpizza.module').then( m => m.AjoutercomposantpizzaPageModule)
  },
  {
    path: 'listecomposantpizza',
    loadChildren: () => import('./composantspizza/listecomposantpizza/listecomposantpizza.module').then( m => m.ListecomposantpizzaPageModule)
  },
  {
    path: 'listeemployes',
    loadChildren: () => import('./employes/listeemployes/listeemployes.module').then( m => m.ListeemployesPageModule)
  },
  {
    path: 'ajouteremployer',
    loadChildren: () => import('./employes/ajouteremployer/ajouteremployer.module').then( m => m.AjouteremployerPageModule)
  },
  {
    path: 'modifieremployer',
    loadChildren: () => import('./employes/modifieremployer/modifieremployer.module').then( m => m.ModifieremployerPageModule)
  },
  {
    path: 'modifiertypeproduit/:idtypeproduit',
    loadChildren: () => import('./typeproduit/modifiertypeproduit/modifiertypeproduit.module').then( m => m.ModifiertypeproduitPageModule)
  },
  {
    path: 'modifiercategorie/:idcategorie',
    loadChildren: () => import('./categories/modifiercategorie/modifiercategorie.module').then( m => m.ModifiercategoriePageModule)
  },
  {
    path: 'modifieringredient/:idcomposant',
    loadChildren: () => import('./ingredients/modifieringredient/modifieringredient.module').then( m => m.ModifieringredientPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./passercommande/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'panier',
    loadChildren: () => import('./passercommande/panier/panier.module').then( m => m.PanierPageModule)
  },
  {
    path: 'detailproduit',
    loadChildren: () => import('./passercommande/produits/detailproduit/detailproduit.module').then( m => m.DetailproduitPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./passercommande/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'partenaire',
    loadChildren: () => import('./passercommande/partenaire/partenaire.module').then( m => m.PartenairePageModule)
  },
  {
    path: 'typelivraison',
    loadChildren: () => import('./passercommande/typelivraison/typelivraison.module').then( m => m.TypelivraisonPageModule)
  },
  {
    path: 'profilclient',
    loadChildren: () => import('./passercommande/profilclient/profilclient.module').then( m => m.ProfilclientPageModule)
  },
  {
    path: 'detailcommande',
    loadChildren: () => import('./commandesclients/listecommandesclients/detailcommande/detailcommande.module').then( m => m.DetailcommandePageModule)
  },
  {
    path: 'confirmercommande',
    loadChildren: () => import('./passercommande/confirmercommande/confirmercommande.module').then( m => m.ConfirmercommandePageModule)
  },
  {
    path: 'archives-commandes',
    loadChildren: () => import('./archives-commandes/archives-commandes.module').then( m => m.ArchivesCommandesPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'detailemploye',
    loadChildren: () => import('./employes/detailemploye/detailemploye.module').then( m => m.DetailemployePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
