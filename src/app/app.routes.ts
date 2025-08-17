import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ItemListComponent } from './features/items/item-list/item-list.component';
import { authGuard } from './core/auth/auth.guard';
import { AddItemComponent } from './features/items/add-item/add-item.component';
import { EditItemComponent } from './features/items/edit-item/edit-item.component';
import { DeclutterDashboardComponent } from './features/items/declutter-dashboard/declutter-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemListComponent, canActivate: [authGuard] },
  { path: 'add-item', component: AddItemComponent, canActivate: [authGuard] },
   { path: 'edit-item/:id', component: EditItemComponent, canActivate: [authGuard] },
   { path: 'dashboard', component: DeclutterDashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // ✅ pathMatch is "full"
  { path: '**', redirectTo: '/dashboard' } // fallback
];
