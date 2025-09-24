import { Injectable, computed, effect, signal } from '@angular/core';
import { CreateExamFormValue } from '../components/create-exam-form/create-exam-form.component';

@Injectable({ providedIn: 'root' })
export class ExamStore {
  private readonly examsSignal = signal<CreateExamFormValue[]>(this.loadFromStorage());

  readonly exams = computed(() => this.examsSignal());

  addExam(exam: CreateExamFormValue): void {
    this.examsSignal.update(list => [...list, exam]);
  }

  private loadFromStorage(): CreateExamFormValue[] {
    try {
      const raw = localStorage.getItem('exams');
      return raw !== null ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  constructor() {
    effect(() => {
      try {
        localStorage.setItem('exams', JSON.stringify(this.examsSignal()));
      } catch {
        // ignore storage errors
      }
    });
  }
}


