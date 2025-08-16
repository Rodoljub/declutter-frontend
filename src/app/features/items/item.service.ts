import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  category: string;
  photoUrl?: string;
  notes?: string;
  decision?: string;
}

export interface DecisionHistory {
  id: number;
  type: string;
  notes?: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(private api: ApiService) {}

  getItems(): Observable<Item[]> {
    return this.api.get<Item[]>('items');
  }

  getItem(id: number): Observable<Item> {
    return this.api.get<Item>(`items/${id}`);
  }

  createItem(data: Partial<Item>): Observable<Item> {
    return this.api.post<Item>('items', data);
  }

  updateItem(id: number, data: Partial<Item>): Observable<Item> {
    return this.api.put<Item>(`items/${id}`, data);
  }

  deleteItem(id: number): Observable<void> {
    return this.api.delete<void>(`items/${id}`);
  }

  viewHistory(itemId: number): Observable<DecisionHistory[]> {
    return this.api.get<DecisionHistory[]>(`items/${itemId}/history`);
  }

  makeDecision(
    itemId: number,
    decision: string,
    notes?: string
  ): Observable<void> {
    return this.api.put<void>(`items/${itemId}/decision`, { decision, notes });
  }

  updateDecision(
    itemId: number,
    decision: string,
    notes?: string
  ): Observable<any> {
    return this.api.patch<any>(`items/${itemId}/decision`, { decision, notes });
  }
}
