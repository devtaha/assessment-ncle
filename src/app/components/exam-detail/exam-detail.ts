import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainHeaderComponent } from '../main-header/main-header.component';
import { CreateExamFormValue } from '../create-exam-form/create-exam-form.component';

@Component({
  selector: 'app-exam-detail',
  standalone: true,
  imports: [CommonModule, MainHeaderComponent],
  templateUrl: './exam-detail.html',
  styleUrl: './exam-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamDetailComponent implements OnInit, OnDestroy {
  private routeSubscription?: Subscription;
  examTitle: string = '';
  startDate: string = '';
  publishDate: string = '';
  status: string = 'Not Published';
  dueDate: string = '';
  duration: string = '';
  submissionPercentage: string = 'Nil';
  description: string = '';
  examId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Scroll to top when component loads
    window.scrollTo(0, 0);

    this.routeSubscription = this.route.params.subscribe(params => {
      this.examId = params['id'];
      this.loadExamData(this.examId);
    });
  }

  private loadExamData(examId: string) {
    try {
      const savedExams = localStorage.getItem('exams');
      if (savedExams !== null) {
        const examsData: CreateExamFormValue[] = JSON.parse(savedExams);
        const examIndex = parseInt(examId.replace('exam-', ''));
        const exam = examsData[examIndex];

        if (exam !== undefined) {
          this.examTitle = exam.title;
          this.startDate = `${exam.startDate} ${exam.startTime}`;
          this.publishDate = `${exam.startDate} ${exam.startTime}`;
          this.dueDate = `${exam.dueDate} ${exam.dueTime}`;
          this.duration = exam.duration;
          this.description = exam.description;
        }
      } else {
        // Fallback to old format
        const savedExam = localStorage.getItem('createExamForm');
        if (savedExam !== null) {
          const exam: CreateExamFormValue = JSON.parse(savedExam);
          this.examTitle = exam.title;
          this.startDate = `${exam.startDate} ${exam.startTime}`;
          this.publishDate = `${exam.startDate} ${exam.startTime}`;
          this.dueDate = `${exam.dueDate} ${exam.dueTime}`;
          this.duration = exam.duration;
          this.description = exam.description;
        }
      }
    } catch (error) {
      // Set default values if loading fails
      this.examTitle = 'Exam Not Found';
      this.description = 'Unable to load exam details.';
    }
  }

  onViewDraft() {
    // Handle view draft action
    // TODO: Implement view draft functionality
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
