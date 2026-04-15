
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-fetch-lab',
  imports: [CommonModule],
  template: `
    <section id="fetch" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">11. Fetch API</h3>
        <p class="article-body">
            The <span class="font-bold text-slate-800">Fetch API</span> provides a powerful and flexible feature set for fetching resources (including across the network).
            It uses <span class="font-bold text-slate-800">Promises</span> to handle results.
        </p>
      </div>

      <!-- Fetch Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-blue-100 text-blue-700 rounded text-xs">Network</span> Request
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Request Code -->
            <div class="space-y-4">
                 <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                    <span class="code-keyword">fetch</span>(<span class="text-green-400">'https://api.example.com/users'</span>)<br>
                    &nbsp;&nbsp;.then(res => res.json())<br>
                    &nbsp;&nbsp;.then(data => <span class="code-keyword">console</span>.log(data));
                </div>
                
                <button (click)="fetchUsers()" [disabled]="isLoading" class="w-full bg-blue-600 text-white font-bold py-3 rounded shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <span *ngIf="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span *ngIf="!isLoading">Make Request 🌐</span>
                </button>
            </div>

            <!-- Response Data -->
            <div class="bg-slate-50 p-4 rounded border border-slate-200 h-[300px] overflow-y-auto custom-scrollbar relative">
                
                <div *ngIf="!users && !isLoading" class="flex flex-col items-center justify-center h-full text-slate-300">
                    <div class="text-4xl mb-2">📡</div>
                    <div class="text-sm">Ready to fetch data...</div>
                </div>

                <div *ngIf="users" class="space-y-3 animate-fadeIn">
                    <div *ngFor="let user of users" class="bg-white p-3 rounded shadow-sm border border-slate-100 flex items-center w-full">
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0">
                            {{ user.name.charAt(0) }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 class="text-sm font-bold text-slate-800 truncate">{{ user.name }}</h4>
                            <p class="text-xs text-slate-500 truncate">{{ user.email }}</p>
                        </div>
                        <div class="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded">
                            200 OK
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </section>
  `,
  styles: `
    .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `
})
export class FetchApiLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  isLoading = false;
  users: any[] | null = null;

  async fetchUsers() {
    this.isLoading = true;
    this.users = null;

    // Simulate network delay
    await new Promise(r => setTimeout(r, 1500));

    this.users = [
      { id: 1, name: "Leanne Graham", email: "Sincere@april.biz" },
      { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv" },
      { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net" },
      { id: 4, name: "Patricia Lebsack", email: "Julianne.OConner@kory.org" },
      { id: 5, name: "Chelsey Dietrich", email: "Lucio_Hettinger@annie.ca" },
    ];
    
    this.isLoading = false;
  }
}
