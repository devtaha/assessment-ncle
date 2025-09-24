import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ExamStore } from '../../stores/exam.store';

@Component({
  selector: 'app-create-exam-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-exam-form.component.html',
  styleUrls: ['./create-exam-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateExamFormComponent {
  @Output() submitForm = new EventEmitter<CreateExamFormValue>();
  attemptsOptions: number[] = [1, 2, 3, 4, 5, 6];
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private examStore: ExamStore) {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      dueTime: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      attempts: [1, [Validators.required]],
      viewCorrectAnswer: ['no', [Validators.required]],
    }, { validators: this.dateRangeValidator });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.value as CreateExamFormValue;
    // Update reactive store; persistence handled in store effect
    this.examStore.addExam(payload);
    this.submitForm.emit(payload);
  }

  selectAttempts(attempts: number): void {
    this.form.get('attempts')?.setValue(attempts);
  }

  selectViewCorrectAnswer(value: 'yes' | 'no'): void {
    this.form.get('viewCorrectAnswer')?.setValue(value);
  }

  resetForm(): void {
    this.form.reset({
      title: '',
      description: '',
      startDate: '',
      startTime: '',
      dueDate: '',
      dueTime: '',
      duration: '',
      attempts: 1,
      viewCorrectAnswer: 'no'
    });
  }

  trackByNumber(index: number, n: number): number {
    return n;
  }

  // Custom validator to ensure start date is before due date
  private dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const startTime = control.get('startTime')?.value;
    const dueDate = control.get('dueDate')?.value;
    const dueTime = control.get('dueTime')?.value;

    if (startDate === null || startDate === '' ||
        startTime === null || startTime === '' ||
        dueDate === null || dueDate === '' ||
        dueTime === null || dueTime === '') {
      return null; // Don't validate if any field is empty
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const dueDateTime = new Date(`${dueDate}T${dueTime}`);

    if (startDateTime >= dueDateTime) {
      return { dateRange: { message: 'Start date and time must be before due date and time' } };
    }

    return null;
  }

  // Helper method to check if date range error exists
  get dateRangeError(): string | null {
    const error = this.form.errors?.['dateRange'];
    return error !== null && error !== undefined ? error.message : null;
  }
}

export interface CreateExamFormValue {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  dueDate: string;
  dueTime: string;
  duration: string;
  attempts: number;
  viewCorrectAnswer: 'yes' | 'no';
}


