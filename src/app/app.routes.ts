import { Routes } from '@angular/router';
import { Dashboard } from '../app/pages/dashboard/Dashboard';
import { NewTransactionForm } from './pages/new-transaction-form/new-transaction-form';
import { Budgets } from '../app/pages/budgets/budgets';
import { TransactionPage } from './pages/transaction-page/transaction-page';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'new-transaction-form', component: NewTransactionForm },
  { path: 'budgets', component: Budgets },
  { path: 'transaction-page', component: TransactionPage },
];
