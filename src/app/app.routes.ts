import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/Dashboard';
import { NewTransactionForm } from './new-transaction-form/new-transaction-form';
import { Budgets } from './budgets/budgets';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'new-transaction-form', component: NewTransactionForm },
  { path: 'budgets', component: Budgets },
];
