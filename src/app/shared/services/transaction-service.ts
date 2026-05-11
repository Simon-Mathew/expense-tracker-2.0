import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type TransactionType = 'Income' | 'Expense';

export type Category =
  | 'Insurance'
  | 'Rent'
  | 'Groceries'
  | 'Transport'
  | 'House Bills'
  | 'Creams For Medication'
  | 'Subscriptions'
  | 'Dinning'
  | 'Credit Card Bills'
  | 'Other';

export interface Transaction {
  _id: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: Category;
  notes: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/transactions';

  getTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  addTransaction(
    transaction: Transaction,
  ): Observable<{ message: string; data: Transaction[] }> {
    return this.http.post<{ message: string; data: Transaction[] }>(
      this.apiUrl,
      transaction,
    );
  }
}
