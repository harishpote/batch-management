import { Component, effect } from '@angular/core';
import { BatchCardComponent } from '../batch-card/batch-card.component';
import { DataService } from '../../services/data.service';
import { Batch } from '../../types/batch.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-batch-list',
  standalone: true,
  imports: [CommonModule, BatchCardComponent],
  templateUrl: './batch-list.component.html',
  styleUrl: './batch-list.component.scss'
})
export class BatchListComponent {
  constructor(public dataService: DataService){ }
}
