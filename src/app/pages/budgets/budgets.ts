import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BudgetsCards } from '../../shared/components/budgets-cards/budgets-cards';
import {
  BudgetCategorySummary,
  Budgeting,
} from '../../shared/services/budgeting';

@Component({
  selector: 'app-budgets',
  imports: [BudgetsCards],
  templateUrl: './budgets.html',
  styleUrl: './budgets.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Budgets implements OnInit {
  private readonly budgeting = inject(Budgeting);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly budgetCards = signal<BudgetCategorySummary[]>([]);
  protected readonly hasIncome = signal(false);
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal('');

  ngOnInit(): void {
    this.loadBudgetSummary();
  }

  protected updateBudgetLimit(
    category: BudgetCategorySummary['category'],
    limit: number,
  ): void {
    if (!Number.isFinite(limit) || limit < 0) {
      return;
    }

    this.budgeting
      .updateBudgetLimit(category, limit)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.budgetCards.update((cards) =>
            cards.map((card) =>
              card.category === category ? { ...card, limit } : card,
            ),
          );
        },
        error: () => {
          this.errorMessage.set('Could not save this budget limit.');
        },
      });
  }

  private loadBudgetSummary(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.budgeting
      .getBudgetSummary()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (summary) => {
          this.hasIncome.set(summary.latestIncome !== null);
          this.budgetCards.set(summary.categories);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('Could not load budget data.');
          this.isLoading.set(false);
        },
      });
  }
}
