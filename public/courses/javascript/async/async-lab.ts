

import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-async-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="async" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-teal-500 pl-4">8. Async/Await & Promises</h3>
        <p class="article-body">
            <span class="font-bold text-slate-800">Asynchronous JavaScript</span> allows code to run in the background without blocking execution.
            Promises represent a value that may be available now, later, or never. <code class="bg-teal-50 text-teal-700 px-1 rounded">async/await</code> makes async code look synchronous.
        </p>
      </div>

      <!-- Async Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-teal-100 text-teal-700 rounded text-xs">Network</span> Request Simulator
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Code -->
            <div class="space-y-4">
                <div class="text-xs font-bold text-slate-500 uppercase">Code Execution</div>
                <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner leading-relaxed">
                    <span class="code-keyword">try</span> {{ '{' }}<br>
                    &nbsp;&nbsp;<span class="text-slate-500">// Start Request</span><br>
                    &nbsp;&nbsp;<span class="code-keyword">const</span> user = <span class="code-keyword">await</span> fetchUser();<br>
                    &nbsp;&nbsp;console.log(<span class="text-green-400">user</span>);<br>
                    {{ '}' }} <span class="code-keyword">catch</span> (error) {{ '{' }}<br>
                    &nbsp;&nbsp;<span class="text-slate-500">// Handle Failure</span><br>
                    &nbsp;&nbsp;console.error(<span class="text-red-400">error</span>);<br>
                    {{ '}' }}
                </div>

                <div class="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded">
                    <input type="checkbox" [(ngModel)]="shouldFail" id="failCheck" class="w-4 h-4 text-red-600 rounded focus:ring-red-500">
                    <label for="failCheck" class="text-sm font-bold text-red-700 cursor-pointer select-none">
                        Simulate Server Error (500)
                    </label>
                </div>
            </div>

            <!-- Execution Visualizer -->
            <div class="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col items-center justify-center min-h-[200px]">
                
                 <button *ngIf="status === 'idle'" (click)="fetchUser()" class="px-6 py-3 bg-teal-600 text-white font-bold rounded shadow hover:bg-teal-700 transition active:scale-95 flex items-center gap-2">
                     <span>Fetch User Data</span>
                     <span>☁️</span>
                 </button>

                 <!-- Loading State -->
                 <div *ngIf="status === 'loading'" class="flex flex-col items-center animate-pulse">
                     <div class="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
                     <span class="text-teal-600 font-bold text-sm">Fetching Data...</span>
                 </div>

                 <!-- Success State -->
                 <div *ngIf="status === 'success'" class="animate-popIn text-center">
                     <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-2 mx-auto">
                         👤
                     </div>
                     <h3 class="font-bold text-slate-800">User Found!</h3>
                     <p class="text-xs text-slate-500 font-mono mt-1">{{ '{' }} name: "Coding Tamilan" {{ '}' }}</p>
                     
                     <button (click)="reset()" class="mt-4 text-xs text-slate-300 underline hover:text-slate-600">
                         Clear
                     </button>
                 </div>

                 <!-- Error State -->
                 <div *ngIf="status === 'error'" class="animate-shake text-center">
                     <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-2 mx-auto">
                         ⚠️
                     </div>
                     <h3 class="font-bold text-red-600">Request Failed</h3>
                     <p class="text-xs text-red-400 font-mono mt-1">Error: 500 Internal Server Error</p>
                     
                     <button (click)="reset()" class="mt-4 text-xs text-slate-300 underline hover:text-slate-600">
                         Try Again
                     </button>
                 </div>

            </div>

        </div>
      </div>
    </section>
  `,
  styles: `
    .animate-popIn { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
    @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes shake { 
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }
  `
})
export class AsyncLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  shouldFail = false;

  async fetchUser() {
    this.status = 'loading';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (this.shouldFail) {
        this.status = 'error';
    } else {
        this.status = 'success';
    }
  }

  reset() {
    this.status = 'idle';
  }
}
