import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuditStateService } from '../../core/services';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  imports: [CommonModule, TableModule, InputTextModule],
})
export class AuditLogComponent implements OnInit, OnDestroy {
  stateService = inject(AuditStateService);

  private _searchSubject$ = new Subject<string>();
  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this._searchSubject$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this._destroy$))
      .subscribe((query) => {
        this.stateService.updateSearchQuery(query);
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSearchInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this._searchSubject$.next(value);
  }
}
