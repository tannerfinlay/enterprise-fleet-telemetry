import { Component, inject, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  imports: [CommonModule, ReactiveFormsModule, StepperModule, ButtonModule, InputTextModule, InputNumberModule],
})
export class DispatchComponent implements OnDestroy {
  private fb = inject(FormBuilder);

  private _destroy$ = new Subject<void>();

  wizardForm: FormGroup = this.fb.group(
    {
      manifestId: ['', [Validators.required, Validators.minLength(5)]],
      destinationNode: [''],
      cargoItems: this.fb.array([]),
      hazmatClearanceCode: [''],
      operationalNotes: [''],
    },
    { validators: [this._crossFieldHazmatValidator] },
  );

  cargoItemsSignal = toSignal(
    this.wizardForm.controls['cargoItems']?.valueChanges.pipe(
      takeUntil(this._destroy$),
      debounceTime(400),
      distinctUntilChanged(),
    ),
    {
      initialValue: this.wizardForm.controls['cargoItems']?.value,
    },
  );

  get cargoItems(): FormArray {
    return this.wizardForm.get('cargoItems') as FormArray;
  }

  totalCargoWeight = computed(() => {
    const items = this.cargoItemsSignal();
    return items.reduce((sum: number, current: any) => sum + (current.weightKg || 0), 0);
  });

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  isManifestInvalid(): boolean {
    const manifestId = this.wizardForm.get('manifestId');
    return !!(manifestId?.invalid || !manifestId?.value);
  }

  addCargoItem(): void {
    const itemGroup = this.fb.group({
      description: ['', Validators.required],
      weightKg: [0, [Validators.required, Validators.min(1)]],
    });
    this.cargoItems.push(itemGroup);
  }

  removeCargoItem(index: number): void {
    this.cargoItems.removeAt(index);
    this.wizardForm.updateValueAndValidity();
  }

  commitManifestDispatch(): void {
    if (this.wizardForm.invalid) return;
    console.log('[ARCHITECTURAL SUBMISSION EVENT] Payload committed:', this.wizardForm.value);

    this._resetForm();
  }

  private _resetForm(): void {
    this.cargoItems.clear();
    this.wizardForm.reset({
      manifestId: '',
      destinationNode: '',
      hazmatClearanceCode: '',
      operationalNotes: '',
    });
  }

  private _crossFieldHazmatValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;
    if (!formGroup) return null;

    const items = (formGroup.get('cargoItems') as FormArray)?.value || [];
    const cumulativeWeight = items.reduce((sum: number, cur: any) => sum + (cur.weightKg || 0), 0);
    const hazmatControl = formGroup.get('hazmatClearanceCode');

    if (cumulativeWeight >= 5000) {
      if (!hazmatControl?.value || hazmatControl.value.trim() === '') {
        hazmatControl?.setErrors({ hazmatRequired: true });
        return { hazmatProtocolViolation: true };
      }
    }

    if (hazmatControl?.hasError('hazmatRequired')) {
      hazmatControl.setErrors(null);
    }
    return null;
  }
}
