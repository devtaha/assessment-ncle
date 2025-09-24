import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-section.component.html',
  styleUrls: ['./details-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsSectionComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}


