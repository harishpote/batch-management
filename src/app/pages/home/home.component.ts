import { Component, effect, ViewChild } from '@angular/core';
import { BatchCardComponent } from '../../components/batch-card/batch-card.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { BatchModalComponent } from '../../components/batch-modal/batch-modal.component';
import { DataService } from '../../services/data.service';
import { BatchListComponent } from '../../components/batch-list/batch-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BatchCardComponent, BatchListComponent, ProductListComponent, BatchModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild(BatchModalComponent) modal!: BatchModalComponent;

  constructor(private dataService: DataService) {}
  
  openModal() {
    this.modal.openModal(this.dataService.createEmptyBatch());
  }
}
