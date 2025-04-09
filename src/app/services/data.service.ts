import { Injectable, signal } from '@angular/core';
import { Batch, Part } from '../types/batch.type';
import { PART_STATUS } from '../constants/data.constant';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private batchData: Batch[] = [];

  $BatchList = new BehaviorSubject<Batch[]>(this.batchData);

  getBatchData(): Batch[] {
    return this.batchData;
  }

  createEmptyBatch(): Batch {
    if(this.batchData.length == 0 || this.batchData[this.batchData.length - 1].items.length > 0){
      this.batchData.push({id: this.nextBatchId(), batchName: this.nextBatchName(), items: []});
      this.$BatchList.next(this.batchData);
    }    
    return this.batchData[this.batchData.length -1];
  }

  nextBatchName(): string {
    return `Parts Batch ${this.batchData.length + 1}`;
  }

  nextBatchId(): number {
    return this.batchData.length + 1;
  }

  updatebatchById(id: number, batchItems: Part[]): void {
    const batchIndex = this.batchData.findIndex(item => item.id === id);
    if(batchIndex !== -1) {
      this.batchData[batchIndex].items = batchItems;
      this.$BatchList.next(this.batchData);
    }
  }

  updateBatchItemStatus(batchId: number, itemId: number, status: PART_STATUS) {
    const batchIndex = this.batchData.findIndex(item => item.id === batchId);
    if(batchIndex !== -1) {
      const itemIndex = this.batchData[batchIndex].items.findIndex(item => item.id === itemId);
      this.batchData[batchIndex].items[itemIndex].status = status;
      this.$BatchList.next(this.batchData);
    }
  }

  findBatchItembyId(batchItemId: number): Batch | undefined{
    return this.batchData.find(item => item.items.find(item=> item.id === batchItemId));
  }
}
