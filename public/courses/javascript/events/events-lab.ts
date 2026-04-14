
import { Component, ElementRef, ViewChild, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-events-lab',
  imports: [CommonModule],
  template: `
    <section id="events" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-pink-500 pl-4">8. Event Handling</h3>
        <p class="article-body">
            JavaScript allows web pages to respond to user interactions like clicks, keypresses, and mouse movements using <span class="font-bold text-slate-800">Event Listeners</span>.
        </p>
      </div>

      <!-- Event Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-pink-100 text-pink-700 rounded text-xs">Interaction</span> Event Logger
        </h4>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Interactive Area -->
            <div class="flex flex-col gap-4">
                <div class="text-xs font-bold text-slate-500 uppercase">Try interacting here:</div>
                
                <!-- Click Area -->
                <button (click)="logEvent('click', $event)" class="w-full py-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded font-bold transition active:scale-95">
                    Click Me! 🖱️
                </button>

                <!-- Input Area -->
                <input (keyup)="logEvent('keyup', $event)" placeholder="Type something..." class="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-pink-400 outline-none transition">
                
                <!-- Hover Area -->
                <div (mouseenter)="logEvent('mouseenter', $event)" (mouseleave)="logEvent('mouseleave', $event)" class="w-full h-24 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded flex items-center justify-center text-purple-700 font-bold cursor-crosshair transition">
                    Hover Over Me 🛸
                </div>
            </div>

            <!-- Log Output -->
            <div class="bg-slate-900 rounded-lg p-4 flex flex-col h-full min-h-[250px] relative overflow-hidden">
                <div class="flex justify-between items-center mb-2 border-b border-slate-700 pb-2">
                    <span class="text-xs font-bold text-slate-300 uppercase">Console Log</span>
                    <button (click)="logs = []" class="text-[10px] text-slate-500 hover:text-white uppercase transition">Clear</button>
                </div>
                
                <div class="flex-1 overflow-y-auto space-y-1 font-mono text-xs custom-scrollbar">
                    <div *ngFor="let log of logs" class="animate-fadeIn">
                        <span class="text-slate-500">[{{ log.time }}]</span>
                        <span class="text-pink-400 font-bold ml-2">{{ log.type }}</span>
                        <span class="text-slate-300 ml-2" *ngIf="log.details">{{ log.details }}</span>
                    </div>
                    <div *ngIf="logs.length === 0" class="text-slate-600 italic mt-4 text-center">
                        Waiting for events...
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  `,
  styles: `
    .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  `
})
export class EventsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  logs: { time: string, type: string, details?: string }[] = [];

  logEvent(type: string, event: Event) {
    const time = new Date().toLocaleTimeString().split(' ')[0];
    let details = '';
    
    if (event instanceof KeyboardEvent) {
        details = `key: "${event.key}"`;
    } else if (event instanceof MouseEvent) {
        details = `x: ${event.offsetX}, y: ${event.offsetY}`;
    }

    this.logs.unshift({ time, type, details });
    if (this.logs.length > 20) this.logs.pop();
  }
}
