import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../../components/main-header/main-header.component';

@Component({
  selector: 'app-pickup',
  standalone: true,
  imports: [CommonModule, MainHeaderComponent],
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickupComponent {
}