import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Part } from '../../types/batch.type';
import { PART_STATUS } from '../../constants/data.constant';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../data-table/data-table.component';
import { ActionEvent, Column, InputEvent } from '../../types/data-table.type';
import { PartDataService } from '../../services/part-data.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
partList: Part[] = [];
@Output() onAction = new EventEmitter<ActionEvent>();
@Output() onPriceChange = new EventEmitter<InputEvent>();

constructor(public partDataService: PartDataService){}

ngOnInit():void {
  this.partDataService.$PartList.subscribe((data: Part[]) => {
    this.partList = data;
  });
}

searchTerm: string = '';
PART_STATUS = PART_STATUS;

 columns: Column[] = [
  {
    name: 'partName',
    displayName:'Part Name',
    type: 'string'
  },
  {
    name: 'price',
    displayName:'Price',
    type: 'input'
  },
  {
    name: 'action',
    displayName:'Action',
    type: 'action'
  },
]

handleAction($event:ActionEvent): void{
  this.onAction.emit($event);
}

handleInputChange($event: InputEvent): void{
  this.partDataService.updatePartPrice($event.row.id, $event.row.price);
}
}
