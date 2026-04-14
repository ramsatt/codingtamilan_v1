import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SyntaxToken {
  text: string;
  type: string;
  explanation: string;
  highlighted?: boolean;
}

@Component({
  selector: 'app-syntax-anatomy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-[#0d1117] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl my-6">
      <div class="px-5 py-3 bg-[#161b22] border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-microscope text-brand-500 text-xs"></i>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Syntax Anatomy</span>
        </div>
        <span class="text-[9px] text-slate-500 font-medium">Click on highlighted words</span>
      </div>

      <div class="p-8">
        <div class="font-mono text-base md:text-lg leading-relaxed mb-8 whitespace-pre-wrap break-words">
          <ng-container *ngFor="let token of tokens">
            <span *ngIf="token.explanation" 
              (click)="selectToken(token)"
              [class.bg-brand-500\/10]="selectedToken === token"
              [class.text-blue-400]="token.type === 'keyword'"
              [class.text-amber-400]="token.type === 'class'"
              [class.text-emerald-400]="token.type === 'method'"
              [class.text-purple-400]="token.type === 'variable'"
              [class.text-orange-400]="token.type === 'value'"
              [class.text-slate-300]="token.type === 'operator' || !token.type"
              [class.border-b-2]="true"
              [class.border-brand-500]="selectedToken === token"
              [class.border-transparent]="selectedToken !== token"
              class="cursor-pointer transition-all px-1 rounded-sm hover:bg-slate-800 text-slate-300">
              {{ token.text }}
            </span>
            <span *ngIf="!token.explanation" class="text-slate-500">{{ token.text }}</span>
          </ng-container>
        </div>

        <!-- Explanation Panel -->
        <div class="min-h-[100px] bg-slate-900/50 rounded-xl p-5 border border-slate-800 transition-all"
          [class.opacity-100]="selectedToken" [class.opacity-0]="!selectedToken">
          <div *ngIf="selectedToken" class="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/20 text-blue-100 border border-blue-500/30">
                {{ selectedToken.type }}
              </span>
              <span class="font-mono text-slate-200 font-bold">{{ selectedToken.text.trim() }}</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed">{{ selectedToken.explanation }}</p>
          </div>
          <div *ngIf="!selectedToken" class="h-full flex items-center justify-center text-slate-600 text-sm italic">
            Click a word above to see its role in the code.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class SyntaxAnatomyComponent implements OnInit {
  @Input() config: any;

  tokens: SyntaxToken[] = [
    { text: 'public', type: 'keyword', explanation: 'Access modifier. It means this class is visible to all other classes.' },
    { text: ' ', type: '', explanation: '' },
    { text: 'class', type: 'keyword', explanation: 'Keyword used to declare a class in Java.' },
    { text: ' ', type: '', explanation: '' },
    { text: 'Main', type: 'class', explanation: 'The name of the class. It must match the filename (Main.java).' },
    { text: ' {', type: 'operator', explanation: 'Opening brace. It marks the beginning of the class body.' }
  ];

  selectedToken: SyntaxToken | null = null;

  ngOnInit() {
    if (this.config?.tokens) {
      this.tokens = this.config.tokens;
    }
  }

  selectToken(token: SyntaxToken) {
    this.selectedToken = this.selectedToken === token ? null : token;
  }
}
