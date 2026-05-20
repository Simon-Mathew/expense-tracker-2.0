import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TransactionService, Transaction } from './transaction-service';

const API_URL = 'http://localhost:3000/api/transactions';

const mockTransaction: Transaction = {
  _id: '1',
  amount: 500,
  type: 'Expense',
  date: '2026-05-16',
  category: 'Groceries',
  notes: 'Weekly groceries',
};

const mockTransactions: Transaction[] = [
  mockTransaction,
  {
    _id: '2',
    amount: 3000,
    type: 'Income',
    date: '2026-05-01',
    category: 'Salary',
    notes: 'Monthly salary',
  },
];

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTransaction', () => {
    it('should GET all transactions from the API', () => {
      service.getTransaction().subscribe((transactions) => {
        expect(transactions).toEqual(mockTransactions);
        expect(transactions.length).toBe(2);
      });

      const req = httpMock.expectOne(API_URL);
      expect(req.request.method).toBe('GET');
      req.flush(mockTransactions);
    });

    it('should return an empty array when there are no transactions', () => {
      service.getTransaction().subscribe((transactions) => {
        expect(transactions).toEqual([]);
      });

      const req = httpMock.expectOne(API_URL);
      req.flush([]);
    });

    it('should propagate HTTP errors', () => {
      service.getTransaction().subscribe({
        next: () => fail('expected an error'),
        error: (err) => expect(err.status).toBe(500),
      });

      const req = httpMock.expectOne(API_URL);
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('addTransaction', () => {
    it('should POST a new transaction and return message and data', () => {
      const response = { message: 'Transaction added', data: mockTransactions };

      service.addTransaction(mockTransaction).subscribe((res) => {
        expect(res.message).toBe('Transaction added');
        expect(res.data).toEqual(mockTransactions);
      });

      const req = httpMock.expectOne(API_URL);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockTransaction);
      req.flush(response);
    });

    it('should send the correct transaction payload', () => {
      service.addTransaction(mockTransaction).subscribe();

      const req = httpMock.expectOne(API_URL);
      expect(req.request.body._id).toBe('1');
      expect(req.request.body.amount).toBe(500);
      expect(req.request.body.type).toBe('Expense');
      expect(req.request.body.category).toBe('Groceries');
      req.flush({ message: 'ok', data: [mockTransaction] });
    });

    it('should propagate HTTP errors on add', () => {
      service.addTransaction(mockTransaction).subscribe({
        next: () => fail('expected an error'),
        error: (err) => expect(err.status).toBe(400),
      });

      const req = httpMock.expectOne(API_URL);
      req.flush('Bad request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateTransaction', () => {
    it('should PATCH the transaction and return message and updated data', () => {
      const updatedTransaction = {
        ...mockTransaction,
        amount: 750,
        notes: 'Updated grocery run',
      };
      const response = { message: 'Transaction updated', data: updatedTransaction };

      service.updateTransaction('1', {
        amount: 750,
        type: 'Expense',
        date: '2026-05-16',
        category: 'Groceries',
        notes: 'Updated grocery run',
      }).subscribe((res) => {
        expect(res.message).toBe('Transaction updated');
        expect(res.data.amount).toBe(750);
        expect(res.data.notes).toBe('Updated grocery run');
      });

      const req = httpMock.expectOne(`${API_URL}/1`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({
        amount: 750,
        type: 'Expense',
        date: '2026-05-16',
        category: 'Groceries',
        notes: 'Updated grocery run',
      });
      req.flush(response);
    });

    it('should include the correct id in the URL', () => {
      service.updateTransaction('abc123', {
        amount: 200,
        type: 'Expense',
        date: '2026-05-16',
        category: 'Groceries',
        notes: 'Updated',
      }).subscribe();

      const req = httpMock.expectOne(`${API_URL}/abc123`);
      expect(req.request.method).toBe('PATCH');
      req.flush({
        message: 'ok',
        data: { ...mockTransaction, _id: 'abc123', amount: 200 },
      });
    });

    it('should propagate HTTP errors on update', () => {
      service.updateTransaction('1', {
        amount: 750,
        type: 'Expense',
        date: '2026-05-16',
        category: 'Groceries',
        notes: 'Updated',
      }).subscribe({
        next: () => fail('expected an error'),
        error: (err) => expect(err.status).toBe(404),
      });

      const req = httpMock.expectOne(`${API_URL}/1`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteTransaction', () => {
    it('should DELETE the transaction by id and return a message', () => {
      service.deleteTransaction('1').subscribe((res) => {
        expect(res.message).toBe('Transaction deleted');
      });

      const req = httpMock.expectOne(`${API_URL}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ message: 'Transaction deleted' });
    });

    it('should include the correct id in the URL', () => {
      service.deleteTransaction('xyz789').subscribe();

      const req = httpMock.expectOne(`${API_URL}/xyz789`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ message: 'Transaction deleted' });
    });

    it('should propagate HTTP errors on delete', () => {
      service.deleteTransaction('1').subscribe({
        next: () => fail('expected an error'),
        error: (err) => expect(err.status).toBe(404),
      });

      const req = httpMock.expectOne(`${API_URL}/1`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });
  });
});
