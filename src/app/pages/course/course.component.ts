import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';
import { CourseSummaryCardComponent } from '../../components/course-summary-card/course-summary-card.component';
import { CourseSummaryDetailsComponent } from '../../components/course-summary-details/course-summary-details.component';
import { AllTopicsComponent, AllTopicsItem } from '../../components/all-topics/all-topics.component';
import { WeekBannerComponent } from '../../components/week-banner/week-banner.component';
import { DetailsSectionComponent } from '../../components/details-section/details-section.component';
import { WorkItemsSectionComponent } from '../../components/work-items-section/work-items-section.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CreateExamFormComponent } from '../../components/create-exam-form/create-exam-form.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, MainHeaderComponent, CourseSummaryCardComponent, CourseSummaryDetailsComponent, AllTopicsComponent, WeekBannerComponent, DetailsSectionComponent, WorkItemsSectionComponent, ModalComponent, CreateExamFormComponent],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
  @ViewChild('createExamForm') createExamForm!: CreateExamFormComponent;

  termLabel: string = 'SPRING SEMESTER 2023-2024';
  allTopicsItems: AllTopicsItem[] = [
    { title: 'Videos', subtitle: 'Watched', done: 14, total: 33, iconUrl: 'assets/icons/all topics/videos.png' },
    { title: 'Attachments', subtitle: 'Opened', done: 80, total: 102, iconUrl: 'assets/icons/all topics/attachments.png' },
    { title: 'Assignments', subtitle: 'Submitted', done: 44, total: 55, iconUrl: 'assets/icons/all topics/assignments.png' },
    { title: 'Exams', subtitle: 'Submitted', done: 28, total: 36, iconUrl: 'assets/icons/all topics/exams.png' },
  ];
  currentWeek: number = this.getWeekNumber(new Date());
  startDate: string;
  endDate: string;
  detailsTitle: string = 'Atomic structure and Periodic Table';
  detailsDescription: string = 'Figma design and FigJam are two products that, when used together, support your entire design process. While you might begin';
  workActiveTab: 'all' | 'todo' = 'all';
  todoCount: number = 4;

  isSelectTypeOpen: boolean = false;
  isCreateExamOpen: boolean = false;

  constructor() {
    const range = this.getWeekRangeFromJanFirst(this.currentWeek);
    this.startDate = this.formatISO(range.start);
    this.endDate = this.formatISO(range.end);
  }

  onAddClicked(): void {
    this.isSelectTypeOpen = true;
  }

  onCloseModal(): void {
    this.isSelectTypeOpen = false;
  }

  onChooseOnlineExam(): void {
    this.isSelectTypeOpen = false;
    this.isCreateExamOpen = true;
  }

  onCloseCreateExam(): void {
    this.isCreateExamOpen = false;
    if (this.createExamForm !== undefined) {
      this.createExamForm.resetForm();
    }
  }

  // Week handling
  onPrevWeek(): void {
    this.currentWeek = Math.max(1, this.currentWeek - 1);
    const range = this.getWeekRangeFromJanFirst(this.currentWeek);
    this.startDate = this.formatISO(range.start);
    this.endDate = this.formatISO(range.end);
  }

  onNextWeek(): void {
    this.currentWeek = this.currentWeek + 1;
    const range = this.getWeekRangeFromJanFirst(this.currentWeek);
    this.startDate = this.formatISO(range.start);
    this.endDate = this.formatISO(range.end);
  }

  private getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diffMs = date.getTime() - startOfYear.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return Math.floor(days / 7) + 1;
  }

  private getWeekRangeFromJanFirst(week: number): { start: Date; end: Date } {
    const year = new Date().getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const start = new Date(startOfYear.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
    const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
    return { start, end };
  }

  private formatISO(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}