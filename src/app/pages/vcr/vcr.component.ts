import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';

@Component({
  selector: 'app-vcr',
  standalone: true,
  imports: [CommonModule, MainHeaderComponent],
  templateUrl: './vcr.component.html',
  styleUrls: ['./vcr.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VcrComponent {
}