import { Component, Input, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Block } from '../../../core/services/course-data.service';
import { Highlight } from 'ngx-highlightjs';
import { SyntaxAnatomyComponent } from '../playground/syntax-anatomy.component';
import { OutputPlaygroundComponent } from '../playground/output-playground.component';
import { VariablePlaygroundComponent } from '../playground/variable-playground.component';
import { DataTypeExplorerComponent } from '../playground/data-type-explorer.component';
import { TypeCastingPlaygroundComponent } from '../playground/type-casting-playground.component';
import { OperatorPlaygroundComponent } from '../playground/operator-playground.component';
import { IfElsePlaygroundComponent } from '../playground/if-else-playground.component';
import { SwitchPlaygroundComponent } from '../playground/switch-playground.component';
import { WhileLoopPlaygroundComponent } from '../playground/while-loop-playground.component';
import { ForLoopPlaygroundComponent } from '../playground/for-loop-playground.component';
import { BreakContinuePlaygroundComponent } from '../playground/break-continue-playground.component';
import { ArraysPlaygroundComponent } from '../playground/arrays-playground.component';
import { StringPlaygroundComponent } from '../playground/string-playground.component';
import { MathPlaygroundComponent } from '../playground/math-playground.component';
import { MethodPlaygroundComponent } from '../playground/method-playground.component';
import { ClassObjectPlaygroundComponent } from '../playground/class-object-playground.component';
import { ConstructorPlaygroundComponent } from '../playground/constructor-playground.component';
import { InheritancePlaygroundComponent } from '../playground/inheritance-playground.component';
import { MethodOverloadingPlaygroundComponent } from '../playground/method-overloading-playground.component';
import { ScopePlaygroundComponent } from '../playground/scope-playground.component';
import { RecursionPlaygroundComponent } from '../playground/recursion-playground.component';
import { ModifiersPlaygroundComponent } from '../playground/modifiers-playground.component';
import { EncapsulationPlaygroundComponent } from '../playground/encapsulation-playground.component';
import { InnerClassPlaygroundComponent } from '../playground/inner-class-playground.component';
import { AbstractionPlaygroundComponent } from '../playground/abstraction-playground.component';
import { InterfacePlaygroundComponent } from '../playground/interface-playground.component';
import { EnumPlaygroundComponent } from '../playground/enum-playground.component';
import { UserInputPlaygroundComponent } from '../playground/user-input-playground.component';
import { DatePlaygroundComponent } from '../playground/date-playground.component';
import { ArrayListPlaygroundComponent } from '../playground/arraylist-playground.component';
import { LinkedListPlaygroundComponent } from '../playground/linkedlist-playground.component';
import { HashMapPlaygroundComponent } from '../playground/hashmap-playground.component';
import { HashSetPlaygroundComponent } from '../playground/hashset-playground.component';
import { IteratorPlaygroundComponent } from '../playground/iterator-playground.component';
import { WrapperClassesPlaygroundComponent } from '../playground/wrapper-classes-playground.component';
import { ExceptionsPlaygroundComponent } from '../playground/exceptions-playground.component';
import { RegexPlaygroundComponent } from '../playground/regex-playground.component';
import { ThreadsPlaygroundComponent } from '../playground/threads-playground.component';
import { LambdaPlaygroundComponent } from '../playground/lambda-playground.component';
import { FilesPlaygroundComponent } from '../playground/files-playground.component';

@Component({
  selector: 'app-block-renderer',
  standalone: true,
  imports: [Highlight, NgClass, SyntaxAnatomyComponent, OutputPlaygroundComponent, VariablePlaygroundComponent, DataTypeExplorerComponent, TypeCastingPlaygroundComponent, OperatorPlaygroundComponent, IfElsePlaygroundComponent, SwitchPlaygroundComponent, WhileLoopPlaygroundComponent, ForLoopPlaygroundComponent, BreakContinuePlaygroundComponent, ArraysPlaygroundComponent, StringPlaygroundComponent, MathPlaygroundComponent, MethodPlaygroundComponent, ClassObjectPlaygroundComponent, ConstructorPlaygroundComponent, InheritancePlaygroundComponent, MethodOverloadingPlaygroundComponent, ScopePlaygroundComponent, RecursionPlaygroundComponent, ModifiersPlaygroundComponent, EncapsulationPlaygroundComponent, InnerClassPlaygroundComponent, AbstractionPlaygroundComponent, InterfacePlaygroundComponent, EnumPlaygroundComponent, UserInputPlaygroundComponent, DatePlaygroundComponent, ArrayListPlaygroundComponent, LinkedListPlaygroundComponent, HashMapPlaygroundComponent, HashSetPlaygroundComponent, IteratorPlaygroundComponent, WrapperClassesPlaygroundComponent, ExceptionsPlaygroundComponent, RegexPlaygroundComponent, ThreadsPlaygroundComponent, LambdaPlaygroundComponent, FilesPlaygroundComponent],
  template: `
    @switch (block.type) {

      @case ('playground') {
        @switch (block.subtype) {
          @case ('output') {
            <app-output-playground [config]="block.config"></app-output-playground>
          }
          @case ('syntax-anatomy') {
            <app-syntax-anatomy [config]="block.config"></app-syntax-anatomy>
          }
          @case ('variable') {
            <app-variable-playground [config]="block.config"></app-variable-playground>
          }
          @case ('data-type-explorer') {
            <app-data-type-explorer></app-data-type-explorer>
          }
          @case ('type-casting') {
            <app-type-casting-playground></app-type-casting-playground>
          }
          @case ('operators') {
            <app-operator-playground></app-operator-playground>
          }
          @case ('if-else') {
            <app-if-else-playground></app-if-else-playground>
          }
          @case ('switch') {
            <app-switch-playground></app-switch-playground>
          }
          @case ('while-loop') {
            <app-while-loop-playground></app-while-loop-playground>
          }
          @case ('for-loop') {
            <app-for-loop-playground></app-for-loop-playground>
          }
          @case ('break-continue') {
            <app-break-continue-playground></app-break-continue-playground>
          }
          @case ('arrays') {
            <app-arrays-playground></app-arrays-playground>
          }
          @case ('strings') {
            <app-string-playground></app-string-playground>
          }
          @case ('math') {
            <app-math-playground></app-math-playground>
          }
          @case ('methods') {
            <app-method-playground></app-method-playground>
          }
          @case ('class-object') {
            <app-class-object-playground></app-class-object-playground>
          }
          @case ('constructor') {
            <app-constructor-playground></app-constructor-playground>
          }
          @case ('inheritance') {
            <app-inheritance-playground></app-inheritance-playground>
          }
          @case ('method-overloading') {
            <app-method-overloading-playground></app-method-overloading-playground>
          }
          @case ('scope') {
            <app-scope-playground></app-scope-playground>
          }
          @case ('recursion') {
            <app-recursion-playground></app-recursion-playground>
          }
          @case ('modifiers') {
            <app-modifiers-playground></app-modifiers-playground>
          }
          @case ('encapsulation') {
            <app-encapsulation-playground></app-encapsulation-playground>
          }
          @case ('inner-class') {
            <app-inner-class-playground></app-inner-class-playground>
          }
          @case ('abstraction') {
            <app-abstraction-playground></app-abstraction-playground>
          }
          @case ('interface') {
            <app-interface-playground></app-interface-playground>
          }
          @case ('enum') {
            <app-enum-playground></app-enum-playground>
          }
          @case ('user-input') {
            <app-user-input-playground></app-user-input-playground>
          }
          @case ('date') {
            <app-date-playground></app-date-playground>
          }
          @case ('arraylist') {
            <app-arraylist-playground></app-arraylist-playground>
          }
          @case ('linkedlist') {
            <app-linkedlist-playground></app-linkedlist-playground>
          }
          @case ('hashmap') {
            <app-hashmap-playground></app-hashmap-playground>
          }
          @case ('hashset') {
            <app-hashset-playground></app-hashset-playground>
          }
          @case ('iterator') {
            <app-iterator-playground></app-iterator-playground>
          }
          @case ('wrapper-classes') {
            <app-wrapper-classes-playground></app-wrapper-classes-playground>
          }
          @case ('exceptions') {
            <app-exceptions-playground></app-exceptions-playground>
          }
          @case ('regex') {
            <app-regex-playground></app-regex-playground>
          }
          @case ('threads') {
            <app-threads-playground></app-threads-playground>
          }
          @case ('lambda') {
            <app-lambda-playground></app-lambda-playground>
          }
          @case ('files') {
            <app-files-playground></app-files-playground>
          }
        }
      }

      @case ('header') {
        @if (block.level === 2) {
          <div class="flex items-center gap-3 mb-1">
            <div class="w-1 h-7 bg-brand-500 rounded-full shrink-0"></div>
            <h2 class="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">{{ block.text }}</h2>
          </div>
        } @else {
          <h3 class="text-xl font-bold text-slate-800 mt-1 mb-0.5 pl-4 border-l-2 border-slate-300">{{ block.text }}</h3>
        }
      }

      @case ('intro') {
        <p class="text-slate-600 text-xl lg:text-2xl leading-relaxed font-medium" [innerHTML]="safe(block.text)"></p>
      }

      @case ('paragraph') {
        <p class="text-slate-600 text-base lg:text-lg leading-relaxed" [innerHTML]="safe(block.text)"></p>
      }

      @case ('list') {
        @if (block.ordered) {
          <ol class="space-y-2.5 list-none">
            @for (item of block.items; track $index) {
              <li class="flex items-start gap-3">
                <div class="w-7 h-7 bg-brand-500 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">{{ $index + 1 }}</div>
                <span class="text-slate-600 text-base leading-relaxed" [innerHTML]="safe(item)"></span>
              </li>
            }
          </ol>
        } @else {
          <ul class="space-y-2.5 list-none">
            @for (item of block.items; track $index) {
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span class="text-slate-600 text-base leading-relaxed" [innerHTML]="safe(item)"></span>
              </li>
            }
          </ul>
        }
      }

      @case ('note') {
        <div class="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-400 rounded-xl p-5">
          <div class="flex gap-3 items-start">
            <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <svg class="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6c0 2.34 1.34 4.36 3.29 5.38L7 18h6l-.29-4.62A6 6 0 0010 2z"/>
              </svg>
            </div>
            <div class="text-sm text-amber-800 leading-relaxed note-content" [innerHTML]="safe(block.text)"></div>
          </div>
        </div>
      }

      @case ('callout') {
        @switch (block.variant) {
          @case ('danger') {
            <div class="bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-xl p-5">
              <div class="flex gap-3 items-start">
                <i class="fa-solid fa-circle-exclamation text-red-500 mt-0.5 shrink-0"></i>
                <div class="text-sm text-red-800 leading-relaxed" [innerHTML]="safe(block.text)"></div>
              </div>
            </div>
          }
          @case ('warning') {
            <div class="bg-yellow-50 border border-yellow-200 border-l-4 border-l-yellow-400 rounded-xl p-5">
              <div class="flex gap-3 items-start">
                <i class="fa-solid fa-triangle-exclamation text-yellow-500 mt-0.5 shrink-0"></i>
                <div class="text-sm text-yellow-800 leading-relaxed" [innerHTML]="safe(block.text)"></div>
              </div>
            </div>
          }
          @default {
            <div class="bg-blue-50 border border-blue-200 border-l-4 border-l-blue-400 rounded-xl p-5">
              <div class="flex gap-3 items-start">
                <i class="fa-solid fa-circle-info text-blue-500 mt-0.5 shrink-0"></i>
                <div class="text-sm text-blue-800 leading-relaxed" [innerHTML]="safe(block.text)"></div>
              </div>
            </div>
          }
        }
      }

      @case ('example') {
        <div class="rounded-xl overflow-hidden shadow-lg border border-slate-700/50">
          <div class="bg-slate-800 px-4 py-2.5 flex items-center gap-2 border-b border-slate-700">
            <div class="flex gap-1.5"><div class="w-3 h-3 rounded-full bg-red-500/80"></div><div class="w-3 h-3 rounded-full bg-yellow-500/80"></div><div class="w-3 h-3 rounded-full bg-green-500/80"></div></div>
            <div class="flex items-center gap-2 text-slate-400 bg-slate-900/50 px-3 py-1 rounded-md ml-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
              <span class="text-xs font-mono tracking-wide">{{ block.title ?? 'Terminal' }}</span>
            </div>
          </div>
          <div class="bg-slate-900 px-6 py-4 font-mono text-sm text-green-400 overflow-x-auto whitespace-pre">{{ block.code }}</div>
        </div>
      }

      @case ('code') {
        <div class="rounded-xl overflow-hidden shadow-lg border border-slate-700/50">
          <div class="bg-slate-800 px-4 py-2.5 flex items-center gap-2 border-b border-slate-700">
            <div class="flex gap-1.5"><div class="w-3 h-3 rounded-full bg-red-500/80"></div><div class="w-3 h-3 rounded-full bg-yellow-500/80"></div><div class="w-3 h-3 rounded-full bg-green-500/80"></div></div>
            <span class="text-xs text-slate-400 font-mono ml-2">{{ block.language ?? 'java' }}</span>
          </div>
          <pre class="code-block-pre"><code [highlight]="decode(block.code)" [language]="block.language ?? 'java'"></code></pre>
        </div>
      }

      @case ('table') {
        <div class="overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-2">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-800 text-white">
                @for (h of block.headers; track $index) {
                  <th class="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">{{ h }}</th>
                }
              </tr>
            </thead>
            <tbody>
              @for (row of block.rows; track $index; let even = $even) {
                <tr [class.bg-white]="even" [class.bg-slate-50]="!even" class="border-t border-slate-100">
                  @for (cell of row; track $index; let first = $first) {
                    <td class="px-4 py-3 text-slate-600 leading-relaxed"
                      [class.font-semibold]="first" [class.text-slate-800]="first"
                      [innerHTML]="safe(cell)"></td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      }

      @case ('highlight') {
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 rounded-xl px-6 py-4">
          <p class="text-lg font-semibold text-indigo-900 italic leading-relaxed">{{ block.text }}</p>
        </div>
      }

      @case ('comparison') {
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          @for (item of block.items; track $index) {
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col gap-2"
                 [style.borderTopColor]="getAccentColor(item.color)"
                 style="border-top-width:3px;border-top-style:solid;">
              <div class="flex items-center gap-2">
                @if (isFaIcon(item.icon)) {
                  <i class="fa-solid {{ item.icon }} text-base" [style.color]="getAccentColor(item.color)"></i>
                } @else {
                  <span class="text-xl leading-none">{{ item.icon }}</span>
                }
                <span class="font-bold text-slate-800 text-sm">{{ item.title }}</span>
              </div>
              <p class="text-sm text-slate-600 leading-relaxed">{{ item.text }}</p>
            </div>
          }
        </div>
      }

      @case ('flow') {
        <div class="flex flex-wrap items-center gap-2">
          @for (step of block.steps; track $index; let last = $last) {
            <div class="flex flex-col items-center gap-1.5 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-200 min-w-[80px]">
              @if (isFaIcon(step.icon)) {
                <i class="fa-solid {{ step.icon }} text-xl text-slate-600"></i>
              } @else {
                <span class="text-xl leading-none">{{ step.icon }}</span>
              }
              <span class="text-xs font-medium text-slate-700 text-center leading-tight">{{ step.label }}</span>
            </div>
            @if (!last) {
              <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            }
          }
        </div>
      }

      @case ('quiz') {
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="bg-slate-800 px-5 py-3 flex items-center gap-2">
            <i class="fa-solid fa-circle-question text-brand-400"></i>
            <span class="text-sm font-semibold text-white">Knowledge Check</span>
          </div>
          <div class="px-5 py-5">
            <p class="font-semibold text-slate-800 mb-4 text-base leading-relaxed">{{ block.question }}</p>
            <div class="space-y-2">
              @for (opt of block.options; track $index) {
                <button
                  (click)="selectQuizOption($index)"
                  [disabled]="quizSubmitted"
                  class="w-full text-left px-4 py-3 rounded-lg border text-sm transition-all cursor-pointer disabled:cursor-default"
                  [ngClass]="getQuizOptionClass($index)">
                  <span class="font-bold mr-2">{{ 'ABCD'[$index] }}.</span>{{ opt.text }}
                </button>
              }
            </div>
            @if (!quizSubmitted) {
              <button
                (click)="submitQuiz()"
                [disabled]="selectedQuizOption === null"
                class="mt-4 px-5 py-2 bg-brand-500 text-white rounded-lg text-sm font-semibold disabled:opacity-40 hover:bg-brand-600 transition-colors">
                Submit Answer
              </button>
            } @else {
              <div class="mt-4 p-4 rounded-lg" [ngClass]="quizCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'">
                <div class="flex items-center gap-2 mb-2">
                  @if (quizCorrect) {
                    <i class="fa-solid fa-circle-check text-emerald-600"></i>
                    <span class="font-semibold text-emerald-700">Correct!</span>
                  } @else {
                    <i class="fa-solid fa-circle-xmark text-red-600"></i>
                    <span class="font-semibold text-red-700">Not quite — the answer is {{ 'ABCD'[block.answer!] }}</span>
                  }
                </div>
                <p class="text-sm text-slate-600 leading-relaxed">{{ block.explanation }}</p>
              </div>
            }
          </div>
        </div>
      }

      @case ('interactive') {
        @if (block.demo === 'tokenizer') {
          <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="bg-slate-800 px-5 py-3 flex items-center gap-2">
              <i class="fa-solid fa-puzzle-piece text-brand-400"></i>
              <span class="text-sm font-semibold text-white">Interactive: Tokenizer Demo</span>
            </div>
            <div class="px-5 py-5">
              <p class="text-sm text-slate-500 mb-3">Type any text below to see how it gets split into tokens.</p>
              <textarea
                class="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-mono text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-brand-400"
                rows="3"
                placeholder="e.g. Hello, how are you today?"
                [value]="tokenizerInput"
                (input)="onTokenizerInput($event)"></textarea>
              <div class="mt-3 flex flex-wrap gap-1.5">
                @for (tok of tokenizerTokens; track $index) {
                  <span class="px-2 py-1 rounded-md text-xs font-mono font-semibold border"
                    [style.background]="tokenColor($index, 0.15)"
                    [style.borderColor]="tokenColor($index, 0.4)"
                    [style.color]="tokenColor($index, 0.85)">{{ tok }}</span>
                }
              </div>
              @if (tokenizerTokens.length) {
                <p class="text-xs text-slate-400 mt-2">{{ tokenizerTokens.length }} token{{ tokenizerTokens.length === 1 ? '' : 's' }}</p>
              }
            </div>
          </div>
        }
      }

      @default {
        <!-- Unknown block type, render nothing -->
      }
    }
  `,
  styles: [`
    :host { display: block; }

    /* Fix inline code from [innerHTML] */
    :host ::ng-deep code,
    :host ::ng-deep .w3-codespan {
      font-family: 'Consolas', 'Monaco', monospace;
      background: #f1f5f9;
      color: #e11d48;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 0.88em;
      border: 1px solid #e2e8f0;
    }

    :host ::ng-deep .note-content code,
    :host ::ng-deep .note-content .w3-codespan {
      background: #fef3c7;
      color: #92400e;
      border-color: #fde68a;
    }

    :host ::ng-deep a {
      color: #f97316;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    :host ::ng-deep a:hover { color: #ea580c; }

    :host ::ng-deep strong { color: #1e293b; font-weight: 700; }

    /* highlight.js code block overrides */
    :host ::ng-deep pre.code-block-pre { margin: 0; border-radius: 0; overflow-x: auto; }
    :host ::ng-deep pre.code-block-pre code.hljs { font-family: 'Consolas', 'Monaco', monospace; font-size: 0.875rem; line-height: 1.85; padding: 1.25rem 1.5rem; background: #1e2433; display: block; }
  `]
})
export class BlockRendererComponent {
  @Input({ required: true }) block!: Block;

  selectedQuizOption: number | null = null;
  quizSubmitted = false;

  // Tokenizer demo state
  tokenizerInput = 'Hello, how are you today?';
  get tokenizerTokens(): string[] { return this.tokenize(this.tokenizerInput); }
  onTokenizerInput(e: Event): void { this.tokenizerInput = (e.target as HTMLTextAreaElement).value; }
  private tokenize(text: string): string[] {
    if (!text.trim()) return [];
    return text.match(/[\w']+|[^\w\s']/g) ?? [];
  }
  private static readonly TOKEN_PALETTE = ['#6366f1','#f59e0b','#10b981','#ef4444','#3b82f6','#8b5cf6','#ec4899','#14b8a6','#f97316','#06b6d4'];
  tokenColor(index: number, alpha: number): string {
    const hex = BlockRendererComponent.TOKEN_PALETTE[index % BlockRendererComponent.TOKEN_PALETTE.length];
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  get quizCorrect(): boolean { return this.selectedQuizOption === this.block.answer; }

  selectQuizOption(index: number): void { if (!this.quizSubmitted) this.selectedQuizOption = index; }
  submitQuiz(): void { if (this.selectedQuizOption !== null) this.quizSubmitted = true; }

  getQuizOptionClass(index: number): Record<string, boolean> {
    if (!this.quizSubmitted) {
      return {
        'border-brand-500 bg-brand-50 text-brand-800': this.selectedQuizOption === index,
        'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50': this.selectedQuizOption !== index,
      };
    }
    if (index === this.block.answer) return { 'border-emerald-500 bg-emerald-50 text-emerald-800': true };
    if (index === this.selectedQuizOption) return { 'border-red-500 bg-red-50 text-red-700': true };
    return { 'border-slate-200 bg-white text-slate-400': true };
  }

  getAccentColor(color: string): string {
    const map: Record<string, string> = {
      blue: '#3b82f6', emerald: '#10b981', purple: '#8b5cf6',
      orange: '#f97316', red: '#ef4444', amber: '#f59e0b',
      violet: '#7c3aed', pink: '#ec4899', cyan: '#06b6d4',
      indigo: '#6366f1', teal: '#14b8a6', yellow: '#eab308',
    };
    return map[color] ?? color;
  }

  isFaIcon(icon: string): boolean { return icon?.startsWith('fa-') ?? false; }

  private sanitizer = inject(DomSanitizer);

  safe(html?: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html ?? '');
  }

  decode(code?: string): string {
    return (code ?? '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&');
  }
}
