import { Component, Input, ViewChild } from '@angular/core';
import { Batch } from '../../types/batch.type';
import { CommonModule } from '@angular/common';
import { Column } from '../../types/data-table.type';
import { DataTableComponent } from '../data-table/data-table.component';
import { BatchModalComponent } from '../batch-modal/batch-modal.component';

@Component({
  selector: 'app-batch-card',
  standalone: true,
  imports: [CommonModule, DataTableComponent, BatchModalComponent],
  templateUrl: './batch-card.component.html',
  styleUrl: './batch-card.component.scss'
})
export class BatchCardComponent {

  columns: Column[] = [
    {
      name: 'partName',
      displayName: 'Part Name',
      type: 'string'
    },
    {
      name: 'price',
      displayName: 'Price',
      type: 'string'
    },
    {
      name: 'time',
      displayName: 'Time',
      type: 'date'
    },
  ]

  @Input() batchData!: Batch;

}
