import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuditStateService } from '../../core/services';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.css',
  imports: [CommonModule, TableModule, InputTextModule],
})
export class AuditLogComponent implements OnInit, OnDestroy {
  stateService = inject(AuditStateService);

  // High-performance isolated input subject to safely slice keyboard layout noise
  private searchSubject$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Pipeline configuration completely isolated from Change Detection loops
    this.searchSubject$.pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((query) => {
      this.stateService.updateSearchQuery(query);
    });
  }

  onSearchInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject$.next(value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
