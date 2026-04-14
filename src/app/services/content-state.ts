import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContentStateService {
  hasContent = signal(false);
}
