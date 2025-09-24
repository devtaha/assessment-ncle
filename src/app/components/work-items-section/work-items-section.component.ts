import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WorkEmptyStateComponent } from '../work-empty-state/work-empty-state.component';
import { CreateExamFormValue } from '../create-exam-form/create-exam-form.component';
import { ExamStore } from '../../stores/exam.store';

export type WorkTab = 'all' | 'todo';

interface WorkItem {
  id: string;
  type: 'Videos' | 'Attachments' | 'Assignments' | 'Exams';
  title: string;
  description?: string;
  startDate?: string;
  startTime?: string;
  dueDate?: string;
  dueTime?: string;
  duration?: string;
  attempts?: number;
  viewCorrectAnswer?: 'yes' | 'no';
}

@Component({
  selector: 'app-work-items-section',
  standalone: true,
  imports: [CommonModule, WorkEmptyStateComponent],
  templateUrl: './work-items-section.component.html',
  styleUrls: ['./work-items-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkItemsSectionComponent {
  @Input() activeTab: WorkTab = 'all';
  @Input() todoCount: number = 0;
  @Input() chips: string[] = ['Videos', 'Attachments', 'Assignments', 'Exams'];
  weekStart = input<string | Date | undefined>();
  weekEnd = input<string | Date | undefined>();

  @Output() activeTabChange = new EventEmitter<WorkTab>();
  @Output() add = new EventEmitter<void>();

  selectedChip = signal<string>('Exams');

  workItems = computed<WorkItem[]>(() =>
    this.examStore.exams().map((examData: CreateExamFormValue, index: number) => ({
      id: 'exam-' + index,
      type: 'Exams' as const,
      title: examData.title,
      description: examData.description,
      startDate: examData.startDate,
      startTime: examData.startTime,
      dueDate: examData.dueDate,
      dueTime: examData.dueTime,
      duration: examData.duration,
      attempts: examData.attempts,
      viewCorrectAnswer: examData.viewCorrectAnswer
    }))
  );

  filteredItems = computed<WorkItem[]>(() => {
    const items = this.workItems().filter(item => item.type === this.selectedChip());
    const [ws, we] = this.normalizeRange(this.weekStart(), this.weekEnd());
    if (!ws || !we) {
      return items;
    }
    return items.filter(it => this.startDateWithinWeek(it, ws, we));
  });

  constructor(private router: Router, private examStore: ExamStore) {}

  setTab(tab: WorkTab) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      this.activeTabChange.emit(this.activeTab);
    }
  }

  selectChip(chip: string) {
    this.selectedChip.set(chip);
  }

  // Filtering is handled by signals in `filteredItems`

  onExamClick(examId: string) {
    void this.router.navigate(['/exam', examId]);
  }

  trackByChip(index: number, chip: string): string {
    return chip;
  }

  trackByItemId(index: number, item: WorkItem): string {
    return item.id;
  }

  private normalizeRange(start?: string | Date, end?: string | Date): [Date | null, Date | null] {
    const s = this.normalizeDate(start);
    const e = this.normalizeDate(end);
    return [s, e];
  }

  private normalizeDate(dateLike?: string | Date): Date | null {
    if (dateLike === undefined || dateLike === null || dateLike === '') { return null; }
    if (dateLike instanceof Date) { return dateLike; }
    const parsed = new Date(dateLike);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  private startDateWithinWeek(item: WorkItem, weekStart: Date, weekEnd: Date): boolean {
    if (item.startDate === undefined || item.startDate === null || item.startDate === '') { return false; }
    const itemStart = new Date(item.startDate);
    if (isNaN(itemStart.getTime())) { return false; }
    // inclusive range check
    return itemStart >= weekStart && itemStart <= weekEnd;
  }
}


