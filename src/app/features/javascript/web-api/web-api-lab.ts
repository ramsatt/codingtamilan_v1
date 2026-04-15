import { Component, inject, NgZone, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
    selector: 'app-js-web-api-lab',
    imports: [CommonModule, FormsModule],
    template: `
    <section id="web-api" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-indigo-500 pl-4">JS Web APIs</h3>
        <p class="article-body">
            Web APIs extend the functionality of the browser. Common APIs include <code class="bg-indigo-100 px-1 rounded text-indigo-900 font-bold text-sm">localStorage</code> and <code class="bg-indigo-100 px-1 rounded text-indigo-900 font-bold text-sm">Geolocation</code>.
        </p>
      </div>

      <!-- LocalStorage Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-indigo-100 text-indigo-700 rounded text-xs">Storage</span> localStorage
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                 <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                    <span class="code-keyword">localStorage</span>.setItem(<span class="text-indigo-400">'key'</span>, <span class="text-indigo-400">'value'</span>);<br>
                    <span class="code-keyword">const</span> val = <span class="code-keyword">localStorage</span>.getItem(<span class="text-indigo-400">'key'</span>);
                </div>
                
                <div class="space-y-2 bg-slate-50 p-3 rounded">
                    <input [(ngModel)]="storageKey" class="w-full p-2 border rounded text-sm outline-none focus:border-indigo-400" placeholder="Key">
                    <input [(ngModel)]="storageValue" class="w-full p-2 border rounded text-sm outline-none focus:border-indigo-400" placeholder="Value">
                    
                    <div class="flex gap-2">
                        <button (click)="saveToStorage()" class="flex-1 bg-indigo-600 text-white font-bold py-2 rounded shadow hover:bg-indigo-700 transition active:scale-95 text-xs">
                            Save
                        </button>
                        <button (click)="loadFromStorage()" class="flex-1 bg-slate-600 text-white font-bold py-2 rounded shadow hover:bg-slate-700 transition active:scale-95 text-xs">
                            Load
                        </button>
                    </div>
                </div>
            </div>

            <div class="bg-slate-50 p-6 rounded border border-slate-200 flex flex-col items-center justify-center min-h-[150px]">
                <div class="text-xs font-bold text-slate-500 uppercase mb-2">Stored Value for "{{ storageKey }}"</div>
                <div class="text-lg font-mono font-bold text-indigo-700 animate-popIn" *ngIf="loadedValue !== null">
                    {{ loadedValue }}
                </div>
                <div *ngIf="loadedValue === null" class="text-slate-300 italic text-sm">
                    No value loaded...
                </div>
            </div>
        </div>
      </div>

      <!-- Geolocation Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-indigo-100 text-indigo-700 rounded text-xs">Location</span> Geolocation API
        </h4>
        
        <div class="flex flex-col items-center justify-center gap-4 bg-slate-50 p-6 rounded border border-slate-200">
            <div *ngIf="coords" class="text-center space-y-2 animate-fadeIn">
                 <div class="text-4xl">🌍</div>
                 <div class="font-mono text-sm text-slate-700">
                     Latitude: <span class="font-bold text-indigo-600">{{ coords.latitude.toFixed(4) }}</span><br>
                     Longitude: <span class="font-bold text-indigo-600">{{ coords.longitude.toFixed(4) }}</span>
                 </div>
                 <div class="text-xs text-slate-300">Accuracy: {{ coords.accuracy }}m</div>
             </div>
             
             <div *ngIf="geoError" class="text-red-500 text-sm font-bold flex items-center gap-2">
                 <span>⚠️</span> {{ geoError }}
             </div>

             <button (click)="getLocation()" [disabled]="isLoadingGeo" class="px-6 py-2 bg-indigo-600 text-white font-bold rounded shadow hover:bg-indigo-700 transition disabled:opacity-50">
                 {{ isLoadingGeo ? 'Locating...' : 'Get My Location' }}
             </button>
        </div>
      </div>

    </section>
  `,
    styles: `
    .animate-popIn { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes popIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `
})
export class WebApiLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

    private ngZone = inject(NgZone);
    private platformId = inject(PLATFORM_ID);

    storageKey = 'myKey';
    storageValue = '';
    loadedValue: string | null = null;

    saveToStorage() {
        if (!isPlatformBrowser(this.platformId) || !this.storageKey) return;
        localStorage.setItem(this.storageKey, this.storageValue);
        this.loadFromStorage();
    }

    loadFromStorage() {
        if (!isPlatformBrowser(this.platformId) || !this.storageKey) return;
        this.loadedValue = localStorage.getItem(this.storageKey);
    }

    // Geolocation
    coords: { latitude: number, longitude: number, accuracy: number } | null = null;
    geoError = '';
    isLoadingGeo = false;

    getLocation() {
        if (!isPlatformBrowser(this.platformId)) return;

        this.isLoadingGeo = true;
        this.geoError = '';
        this.coords = null;

        if (!navigator.geolocation) {
            this.geoError = 'Geolocation is not supported by your browser';
            this.isLoadingGeo = false;
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.ngZone.run(() => {
                    this.coords = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    this.isLoadingGeo = false;
                });
            },
            (error) => {
                this.ngZone.run(() => {
                    this.geoError = `Error: ${error.message}`;
                    this.isLoadingGeo = false;
                });
            }
        );
    }
}
