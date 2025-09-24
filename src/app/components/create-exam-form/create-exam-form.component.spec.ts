import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateExamFormComponent, CreateExamFormValue } from './create-exam-form.component';
import { ExamStore } from '../../stores/exam.store';

describe('CreateExamFormComponent', () => {
  let component: CreateExamFormComponent;
  let fixture: ComponentFixture<CreateExamFormComponent>;
  let examStoreMock: { addExam: jasmine.Spy };

  beforeEach(async () => {
    examStoreMock = { addExam: jasmine.createSpy('addExam') };

    await TestBed.configureTestingModule({
      imports: [CreateExamFormComponent],
      providers: [{ provide: ExamStore, useValue: examStoreMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateExamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with defaults', () => {
    const formValue = component.form.value as CreateExamFormValue;
    expect(formValue.attempts).toBe(1);
    expect(formValue.viewCorrectAnswer).toBe('no');
  });

  it('should not submit when form invalid', () => {
    const emitSpy = spyOn(component.submitForm, 'emit');
    component.onSubmit();
    expect(examStoreMock.addExam).not.toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should call store and emit when form valid', () => {
    const emitSpy = spyOn(component.submitForm, 'emit');
    component.form.setValue({
      title: 'Quiz 1',
      description: 'Basics',
      startDate: '2025-01-08',
      startTime: '09:00',
      dueDate: '2025-01-08',
      dueTime: '10:00',
      duration: '60',
      attempts: 1,
      viewCorrectAnswer: 'no'
    });

    component.onSubmit();

    expect(examStoreMock.addExam).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });
});


