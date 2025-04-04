import { Component } from '@angular/core';
import { BatchCardComponent } from '../../components/batch-card/batch-card.component';
import { Batch, BatchItem, Part } from '../../types/batch.type';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { PART_LIST, PART_STATUS } from '../../constants/data.constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BatchCardComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  partList = PART_LIST;
  PART_STATUS = PART_STATUS;
  batchList: Batch[] = []
  batchCounter: number = 0;
  nextBatchName: string = '';
  preparedParts: BatchItem[] = [];

  ngOnInit() {
    this.batchCounter = this.batchList.length;
  }

  openModal() {
    if(this.batchList.length == 0 || this.batchList[this.batchList.length - 1].items.length > 0){
      this.nextBatchName = '';
      this.nextBatchName = 'Parts Batch' + ' ' + (this.batchCounter + 1);
      this.batchList.push(
        {
          batchName: this.nextBatchName,
          items: []
        }
      )
      this.batchCounter = this.batchList.length;
    } else {

    }
  }

  onPartActionClick($event: any) {
    if ($event.status === PART_STATUS.UNPROCESSED) {
      $event.time = new Date().toString();
      let newItem = $event;
      this.preparedParts.push(
        {
          partName: newItem.partName,
          price: newItem.price,
          status: PART_STATUS.PROCESSED,
          time: newItem.time
        }
      )
      
    } 
  }

  private updatePartStatus(part: Part, status: string) {
    this.partList = this.partList.map((item: Part) => {
      if (item.partName === part.partName) {
        return { ...item, status: status };
      }
      return item;
    });
  }

  private addPartsIntoBatch(newPartList: BatchItem[]) {
    this.batchList[this.batchList.length - 1].items = newPartList;
    newPartList.forEach(element=> {
      this.updatePartStatus(element, PART_STATUS.PROCESSED);
    });
    this.preparedParts = [];  
  }

  updatePartPrice($event: Part) {
    console.log('updatePartPrice')
  }

  onSubmit() {
    this.addPartsIntoBatch(this.preparedParts);
    console.log('batchList:', this.batchList);
  }
}
