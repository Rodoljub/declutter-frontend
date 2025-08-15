import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit {
  items: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get('items').subscribe((data: any) => this.items = data);
  }
}
