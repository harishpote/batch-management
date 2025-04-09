import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PART_STATUS } from '../../constants/data.constant';
import { ActionEvent, Column, InputEvent } from '../../types/data-table.type';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  searchTerm: string = '';
  PART_STATUS = PART_STATUS;

  @Input() dataSource: any[] = [];
  @Input() columns: Column[] = [];
  @Input() filter: boolean = false;
  @Input() style: 'border'| 'default' = 'default';
  @Output() handleAction = new EventEmitter<ActionEvent>();
  @Output() handleInputChange = new EventEmitter<InputEvent>();

  get filteredRecords() {
    return this.dataSource.filter((record: any) =>
      record.partName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onInputChange(column: string, row: any, $event: any) {
    row[column]= $event.target.value;
    this.handleInputChange.emit({column: column, row : row});
  }

  onActionClick(action: string, row: any){
    this.handleAction.emit({action: action, row : row});
  }
}
