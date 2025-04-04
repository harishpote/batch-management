import { Component, Input } from '@angular/core';
import { Batch } from '../../types/batch.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-batch-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './batch-card.component.html',
  styleUrl: './batch-card.component.scss'
})
export class BatchCardComponent {

 @Input() batchData!: Batch;

}
