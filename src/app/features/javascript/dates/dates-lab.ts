
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

@Component({
  selector: 'app-js-dates-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="dates" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-violet-500 pl-4">7. JS Dates</h3>
        <p class="article-body">
            JavaScript <code class="px-1 bg-slate-100 rounded text-slate-700 font-bold text-sm">Date</code> objects represent a single moment in time. 
            There are methods to get and set date/time components.
        </p>
      </div>

      <!-- Date Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-violet-100 text-violet-700 rounded text-xs">Time</span> Object
        </h4>
        
        <div class="space-y-6">
             <div class="bg-violet-50 p-6 rounded-lg border border-violet-200 flex flex-col items-center justify-center text-center">
                 <div class="text-4xl font-mono font-bold text-violet-800 mb-2">
                     {{ clock | date: 'mediumTime' }}
                 </div>
                 <div class="text-sm font-mono text-violet-600">
                     {{ clock | date: 'fullDate' }}
                 </div>
                 <div class="text-xs text-violet-400 mt-2 italic">
                     new Date()
                 </div>
             </div>

             <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                 
                 <!-- Year -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1">.getFullYear()</div>
                     <div class="font-mono text-violet-700 font-bold text-lg">{{ clock.getFullYear() }}</div>
                 </div>

                 <!-- Month -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1">.getMonth()</div>
                     <div class="font-mono text-violet-700 font-bold text-lg">{{ clock.getMonth() }}</div>
                     <div class="text-[10px] text-slate-300">0-indexed (Jan=0)</div>
                 </div>

                 <!-- Date -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1">.getDate()</div>
                     <div class="font-mono text-violet-700 font-bold text-lg">{{ clock.getDate() }}</div>
                 </div>

                 <!-- Day -->
                 <div class="bg-slate-50 p-3 rounded border border-slate-200">
                     <div class="text-xs font-bold text-slate-500 uppercase mb-1">.getDay()</div>
                     <div class="font-mono text-violet-700 font-bold text-lg">{{ clock.getDay() }}</div>
                     <div class="text-[10px] text-slate-300">0=Sun, 6=Sat</div>
                 </div>

             </div>

             <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                 <div class="mb-2 text-slate-500 border-b border-slate-700 pb-1">Formatted Strings</div>
                 <div class="grid grid-cols-1 gap-2">
                     <div class="flex justify-between">
                         <span class="text-purple-400">.toISOString()</span>
                         <span class="text-green-400 truncate ml-4">{{ clock.toISOString() }}</span>
                     </div>
                     <div class="flex justify-between">
                         <span class="text-purple-400">.toUTCString()</span>
                         <span class="text-green-400 truncate ml-4">{{ clock.toUTCString() }}</span>
                     </div>
                     <div class="flex justify-between">
                         <span class="text-purple-400">.toLocaleDateString()</span>
                         <span class="text-green-400 truncate ml-4">{{ clock.toLocaleDateString() }}</span>
                     </div>
                      <div class="flex justify-between">
                         <span class="text-purple-400">.getTime()</span>
                         <span class="text-green-400 truncate ml-4">{{ clock.getTime() }}</span>
                     </div>
                 </div>
             </div>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class DatesLab implements OnInit, OnDestroy {
  private contentState = inject(ContentStateService);

  clock = new Date();
  timer: any;

  ngOnInit() {
    this.contentState.hasContent.set(true);
    this.timer = setInterval(() => {
      this.clock = new Date();
    }, 1000);
  }

  ngOnDestroy() {
      if (this.timer) clearInterval(this.timer);
  }
}
