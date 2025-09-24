import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() breadcrumbs: { label: string; route?: string | string[] }[] = [];

  trackByLabel(index: number, crumb: { label: string; route?: string | string[] }): string {
    return crumb.label;
  }
}


