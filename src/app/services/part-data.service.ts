import { Injectable } from '@angular/core';
import { PART_STATUS } from '../constants/data.constant';
import { Part } from '../types/batch.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartDataService {
  private partsData: Part[] = [
      {
          id: 1,
          partName: 'Anntena',
          price: 15,
          status: PART_STATUS.UNPROCESSED
      },
      {
          id: 2,
          partName: 'Drive XTP',
          price: 25,
          status: PART_STATUS.UNPROCESSED
      },
      {
          id: 3,
          partName: 'Keyboard',
          price: 85,
          status: PART_STATUS.UNPROCESSED
      },
      {
          id: 4,
          partName: 'LCD',
          price: 249,
          status: PART_STATUS.UNPROCESSED
      },
      {
          id: 5,
          partName: 'System Board',
          price: 1125,
          status: PART_STATUS.UNPROCESSED
      }
  ];

  $PartList = new BehaviorSubject<Part[]>(this.partsData);

  getPartsData(): Part[] {
    return this.partsData;
  }
  updatePartPrice(id: number, price: number): void{
    const partIndex = this.partsData.findIndex(item => item.id === id);
    if(partIndex !== -1) {
        this.partsData[partIndex].price = price;
        this.$PartList.next(this.partsData);
    }
  }
  updatePartStatus(id: number, status: PART_STATUS): void {
    const partIndex = this.partsData.findIndex(item => item.id === id);
    if(partIndex !== -1) {
        this.partsData[partIndex].status = status;
        this.$PartList.next(this.partsData);
    }
  }
}
