import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/Dashboard';
import { NewTransactionForm } from './new-transaction-form/new-transaction-form';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'Dashboard', component: Dashboard },
  { path: 'New-Transaction-Form', component: NewTransactionForm },
];
