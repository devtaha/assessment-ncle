import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';

@Component({
  selector: 'app-grade-management',
  standalone: true,
  imports: [CommonModule, MainHeaderComponent],
  templateUrl: './grade-management.component.html',
  styleUrls: ['./grade-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradeManagementComponent {
}