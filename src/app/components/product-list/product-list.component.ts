import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Part } from '../../types/batch.type';
import { PART_STATUS } from '../../constants/data.constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
@Input() partList: Part[] = [];
@Output() onAction = new EventEmitter<Part>()
@Output() onPriceChange = new EventEmitter<Part>()

searchTerm: string = '';
PART_STATUS = PART_STATUS;

get filteredRecords() {
  return this.partList.filter((record: Part) => 
    record.partName.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

doAction($event: Part) {
  this.onAction.emit($event);
}

doChange($event:any, item: Part) {
  item.price = $event.target.value;
  this.onPriceChange.emit(item);
}
}
