import { Component, Input, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-html-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl my-6 flex flex-col md:flex-row h-[500px]">
      
      <!-- Editor Area -->
      <div class="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-slate-700">
        <!-- Header -->
        <div class="px-4 py-3 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span class="text-xs font-bold text-slate-400 ml-2 uppercase tracking-widest">HTML Editor</span>
          </div>
          <span class="text-[10px] font-medium text-slate-500 bg-slate-900 px-2 py-1 rounded">index.html</span>
        </div>
        
        <!-- Textarea -->
        <textarea 
          [(ngModel)]="code"
          class="flex-1 w-full bg-slate-950 text-slate-300 font-mono text-sm p-4 border-none focus:ring-0 resize-none"
          spellcheck="false"
        ></textarea>
      </div>

      <!-- Preview Area -->
      <div class="flex-1 flex flex-col bg-white">
        <!-- Header -->
        <div class="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Preview</span>
        </div>
        
        <!-- Iframe -->
        <iframe 
          [srcdoc]="safeHtml()" 
          class="flex-1 w-full border-none"
          sandbox="allow-scripts"
        ></iframe>
      </div>
      
    </div>
  `
})
export class HtmlPlaygroundComponent implements OnInit {
  @Input() initialCode: string = '';
  
  code = signal<string>('');
  
  // Computes safe HTML for the iframe srcdoc every time code changes
  safeHtml = computed(() => {
    return this.sanitizer.bypassSecurityTrustHtml(this.code());
  });

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.initialCode) {
      this.code.set(this.initialCode);
    } else {
      this.code.set('<!DOCTYPE html>\\n<html>\\n<head>\\n  <title>Practice</title>\\n</head>\\n<body>\\n  <h1>Hello HTML!</h1>\\n</body>\\n</html>');
    }
  }
}
