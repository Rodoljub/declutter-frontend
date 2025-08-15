









import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ItemListComponent } from './features/items/item-list/item-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
   { path: 'items', component: ItemListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // ✅ pathMatch is "full"
];
