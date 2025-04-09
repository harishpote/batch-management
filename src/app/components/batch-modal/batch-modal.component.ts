import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { DataService } from '../../services/data.service';
import { Batch, Part } from '../../types/batch.type';
import { ActionEvent, InputEvent } from '../../types/data-table.type';
import { PART_STATUS } from '../../constants/data.constant';
import { PartDataService } from '../../services/part-data.service';

@Component({
  selector: 'app-batch-modal',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './batch-modal.component.html',
  styleUrl: './batch-modal.component.scss'
})
export class BatchModalComponent implements OnInit {
isModalOpen = false;
batchItems: Part[] = [];
batchObj!: Batch;

constructor(private dataService: DataService, private partdataService: PartDataService) {}

ngOnInit(): void {
}

openModal(batch: Batch, action: string = 'create'): void {
  this.batchObj = batch;
  this.isModalOpen = true;
}

closeModal(): void {
  this.isModalOpen = false;
}

handleAction($event: ActionEvent): void {
  const existingItem: Batch | undefined = this.dataService.findBatchItembyId($event.row.id);
  let partRemark: string = '';
  if($event.action === 'add' && !this.batchItems.some(item => item.id === $event.row.id)) {
    if(existingItem?.items.find(item => item.status === PART_STATUS.REMOVED)){
      partRemark = `${$event.row.partName} removed from ${existingItem.batchName}`;
    }
    const newItem: Part = {
      partName: $event.row.partName,
      id: $event.row.id,
      price: $event.row.price,
      status: PART_STATUS.PROCESSED,
      time: new Date().toString(),
      remark: partRemark.length ? partRemark : ''
    };
    this.batchItems.push(newItem);
    this.partdataService.updatePartStatus(newItem.id, newItem.status);
  } else if($event.action === 'remove') {
    this.partdataService.updatePartStatus($event.row.id, PART_STATUS.UNPROCESSED);
    if(existingItem) {
      this.dataService.updateBatchItemStatus(existingItem.id, $event.row.id, PART_STATUS.REMOVED);
    }
    this.batchItems = this.batchItems.filter(item => item.id !== $event.row.id);
  }
}

onSave(){
  this.dataService.updatebatchById(this.batchObj.id, this.batchItems);
  this.batchItems = [];
}
}
