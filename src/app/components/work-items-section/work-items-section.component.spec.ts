import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { WorkItemsSectionComponent } from './work-items-section.component';
import { ExamStore } from '../../stores/exam.store';

describe('WorkItemsSectionComponent', () => {
  let component: WorkItemsSectionComponent;
  let fixture: ComponentFixture<WorkItemsSectionComponent>;
  let examStoreMock: { exams: () => any };

  beforeEach(async () => {
    examStoreMock = {
      // exams is a signal-like getter: calling exams() returns the array
      exams: () => ([
        { title: 'Exam A', description: '', startDate: '2025-01-08', startTime: '09:00', dueDate: '2025-01-08', dueTime: '10:00', duration: '60', attempts: 1, viewCorrectAnswer: 'no' },
        { title: 'Exam B', description: '', startDate: '2025-02-01', startTime: '09:00', dueDate: '2025-02-01', dueTime: '10:00', duration: '60', attempts: 1, viewCorrectAnswer: 'no' }
      ])
    } as any;

    await TestBed.configureTestingModule({
      imports: [WorkItemsSectionComponent],
      providers: [
        { provide: ExamStore, useValue: examStoreMock },
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkItemsSectionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('weekStart', '2025-01-06'); // Mon
    fixture.componentRef.setInput('weekEnd', '2025-01-12');   // Sun
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters exams by startDate within the selected week', () => {
    const items = component.filteredItems();
    expect(items.length).toBe(1);
    expect(items[0].title).toBe('Exam A');
  });
});


