import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TypeMeta {
  description: string;
  range: string;
  group: 'integer' | 'decimal' | 'boolean' | 'char' | 'text';
  sliderMin?: number;
  sliderMax?: number;
  suffix?: string;
}

@Component({
  selector: 'app-variable-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Variable Creator</span>
        </div>
        <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-full px-3 py-1">
          <i class="fa-solid fa-memory text-[8px]"></i> MEMORY SIMULATOR
        </div>
      </div>

      <div class="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

        <!-- ── LEFT: Configuration ── -->
        <div class="p-6 space-y-5">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Create Your Variable</p>

          <!-- Type Selector -->
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-3">Data Type</label>
            <div class="grid grid-cols-3 gap-2">
              @for (t of typeKeys; track t) {
                <button (click)="selectType(t)"
                  class="px-2 py-2.5 rounded-xl text-left flex flex-col gap-1 border-2 transition-all"
                  [class.border-brand-500]="type === t"
                  [class.bg-brand-50]="type === t"
                  [class.border-slate-100]="type !== t"
                  [class.bg-slate-50]="type !== t">
                  <span class="font-mono text-sm font-bold"
                    [class.text-brand-700]="type === t"
                    [class.text-slate-700]="type !== t">{{ t }}</span>
                  <span class="text-[10px] font-medium leading-tight"
                    [class.text-brand-500]="type === t"
                    [class.text-slate-400]="type !== t">{{ typeMeta[t].description }}</span>
                </button>
              }
            </div>
            <!-- Type range hint -->
            <div class="mt-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg flex items-start gap-2 text-[10px] text-slate-500">
              <i class="fa-solid fa-circle-info text-brand-400 mt-0.5 shrink-0"></i>
              <span>{{ typeMeta[type].range }}</span>
            </div>
          </div>

          <!-- Final Toggle -->
          <div class="flex items-center justify-between px-4 py-3 rounded-xl border transition-all"
            [class.bg-amber-50]="isFinal" [class.border-amber-200]="isFinal"
            [class.bg-slate-50]="!isFinal" [class.border-slate-100]="!isFinal">
            <div>
              <p class="text-xs font-bold" [class.text-amber-800]="isFinal" [class.text-slate-700]="!isFinal">
                Make it <code class="font-mono px-1 py-0.5 rounded text-[11px]"
                  [class.bg-amber-100]="isFinal" [class.bg-slate-200]="!isFinal">final</code>?
              </p>
              <p class="text-[10px] mt-0.5" [class.text-amber-600]="isFinal" [class.text-slate-400]="!isFinal">
                Prevents the value from being changed later
              </p>
            </div>
            <button (click)="isFinal = !isFinal"
              class="relative w-11 h-6 rounded-full transition-colors focus:outline-none shrink-0"
              [class.bg-amber-500]="isFinal" [class.bg-slate-200]="!isFinal">
              <span class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                [class.translate-x-5]="isFinal" [class.translate-x-0]="!isFinal"></span>
            </button>
          </div>

          <!-- Variable Name + Value side-by-side -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Variable Name -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-2">Variable Name</label>
              <div class="relative">
                <input [(ngModel)]="name" (ngModelChange)="validateName()"
                  class="w-full bg-slate-50 border-2 rounded-xl px-3 py-2.5 text-sm font-mono transition-all outline-none pr-8"
                  [class.border-emerald-400]="name && nameValid"
                  [class.border-red-400]="name && !nameValid"
                  [class.border-slate-100]="!name"
                  placeholder="e.g. myAge">
                @if (name) {
                  <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs">
                    @if (nameValid) {
                      <i class="fa-solid fa-check text-emerald-500"></i>
                    } @else {
                      <i class="fa-solid fa-xmark text-red-500"></i>
                    }
                  </span>
                }
              </div>
              @if (name && !nameValid) {
                <p class="text-[10px] text-red-500 mt-1.5 flex items-start gap-1">
                  <i class="fa-solid fa-triangle-exclamation mt-0.5 shrink-0"></i> {{ nameError }}
                </p>
              }
              @if (name && nameValid) {
                <p class="text-[10px] text-emerald-600 mt-1.5 flex items-center gap-1">
                  <i class="fa-solid fa-circle-check"></i> Valid name
                </p>
              }
            </div>

            <!-- Value Input (smart by type group) -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-2">Value</label>

              <!-- boolean: two-button toggle -->
              @if (typeMeta[type].group === 'boolean') {
                <div class="flex gap-2">
                  <button (click)="value = 'true'"
                    class="flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all"
                    [class.border-emerald-500]="value === 'true'"
                    [class.bg-emerald-50]="value === 'true'"
                    [class.text-emerald-700]="value === 'true'"
                    [class.border-slate-100]="value !== 'true'"
                    [class.text-slate-400]="value !== 'true'">
                    <i class="fa-solid fa-check mr-1"></i>true
                  </button>
                  <button (click)="value = 'false'"
                    class="flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all"
                    [class.border-red-400]="value === 'false'"
                    [class.bg-red-50]="value === 'false'"
                    [class.text-red-600]="value === 'false'"
                    [class.border-slate-100]="value !== 'false'"
                    [class.text-slate-400]="value !== 'false'">
                    <i class="fa-solid fa-xmark mr-1"></i>false
                  </button>
                </div>
              }

              <!-- integer / decimal / char / String: single text/number input -->
              @if (typeMeta[type].group !== 'boolean') {
                <input [(ngModel)]="value"
                  [type]="typeMeta[type].group === 'text' || typeMeta[type].group === 'char' ? 'text' : 'number'"
                  [step]="typeMeta[type].group === 'decimal' ? '0.01' : '1'"
                  [maxlength]="typeMeta[type].group === 'char' ? 1 : 999"
                  [placeholder]="valuePlaceholder()"
                  class="w-full bg-slate-50 border-2 border-slate-100 focus:border-brand-500 focus:bg-white rounded-xl px-3 py-2.5 text-sm font-mono transition-all outline-none">
                <p class="text-[10px] text-slate-400 mt-1.5">{{ valueHint() }}</p>
              }
            </div>
          </div>

          <!-- Slider row for int/byte/short -->
          @if (typeMeta[type].group === 'integer' && typeMeta[type].sliderMin !== undefined) {
            <div class="space-y-1.5 pt-1">
              <input [(ngModel)]="value" type="range"
                [min]="typeMeta[type].sliderMin ?? null" [max]="typeMeta[type].sliderMax ?? null"
                class="w-full accent-brand-500 cursor-pointer">
              <div class="flex justify-between text-[9px] text-slate-400 px-1">
                <span>{{ typeMeta[type].sliderMin }}</span>
                <span class="font-bold text-brand-500">{{ value }}</span>
                <span>{{ typeMeta[type].sliderMax }}</span>
              </div>
            </div>
          }
        </div>

        <!-- ── RIGHT: Code Preview + Memory ── -->
        <div class="p-6 bg-slate-50/50 flex flex-col gap-6">

          <!-- Java Code Preview at top -->
          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <p class="text-[9px] font-bold text-slate-500 mb-3 uppercase tracking-widest">Resulting Java Code</p>
            <div class="text-base font-mono leading-relaxed">@if (isFinal) {<span class="text-amber-400">final&#32;</span>}<span class="text-blue-400">{{ type }}&#32;</span><span class="text-white">{{ name || 'variable' }}&#32;</span><span class="text-slate-400">=&#32;</span><span [class.text-emerald-400]="typeMeta[type].group !== 'boolean'" [class.text-purple-400]="typeMeta[type].group === 'boolean'">{{ formatValue() }}</span><span class="text-slate-500">;</span></div>
          </div>

          <!-- Memory Box centred below code -->
          <div class="flex flex-col items-center flex-1 justify-center gap-5">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Memory Representation</p>

            <div class="flex flex-col items-center">
              <div class="relative">
                <div class="w-44 h-44 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center relative transition-all duration-300 border-4"
                  [class.border-amber-400]="isFinal"
                  [class.border-slate-200]="!isFinal">

                  <!-- Type badge -->
                  <div class="absolute -top-3.5 left-3 right-3 py-1 text-[10px] font-black text-white rounded-md shadow text-center transition-colors duration-300"
                    [class.bg-brand-500]="!isFinal"
                    [class.bg-amber-500]="isFinal">
                    @if (isFinal) {
                      <i class="fa-solid fa-lock mr-1 text-[8px]"></i>
                    }
                    {{ type.toUpperCase() }}
                  </div>

                  <!-- Value display -->
                  <div class="text-3xl font-black text-slate-900 mb-1 break-all px-4 leading-tight">
                    {{ displayValue() }}
                  </div>
                  <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stored Value</div>

                <!-- Lock badge for final -->
                @if (isFinal) {
                  <div class="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
                    <i class="fa-solid fa-lock text-white text-xs"></i>
                  </div>
                }
              </div>
            </div>

            <!-- Variable name label -->
            <div class="mt-8 flex flex-col items-center gap-1">
              <div class="w-px h-5 bg-slate-300"></div>
              <div class="px-3 py-1.5 bg-white border-2 border-slate-200 rounded-full text-xs font-mono font-bold text-brand-600 shadow-sm">
                {{ name || 'unnamed' }}
              </div>
              <p class="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">Variable name (label)</p>
            </div>
          </div>

          <!-- Info card (dynamic) -->
          <div class="w-full max-w-xs">
            <div class="p-4 rounded-xl text-left text-xs leading-relaxed border transition-all duration-300"
              [class.bg-amber-50]="isFinal" [class.border-amber-200]="isFinal"
              [class.bg-emerald-50]="!isFinal" [class.border-emerald-100]="!isFinal">
              <div class="flex gap-2.5 items-start">
                @if (isFinal) {
                  <i class="fa-solid fa-lock text-amber-500 mt-0.5 shrink-0"></i>
                  <p class="text-amber-800">
                    A <code class="font-mono bg-amber-100 px-1 rounded">final</code> variable is a <b>constant</b> — once you assign a value, it <b>cannot be changed</b>.
                  </p>
                } @else {
                  <i class="fa-solid fa-circle-info text-emerald-500 mt-0.5 shrink-0"></i>
                  <p class="text-emerald-800">
                    A <b>{{ type }}</b> variable is a labeled container that holds <b>{{ typeMeta[type].description }}</b>. Only {{ typeMeta[type].description }} can be stored in it.
                  </p>
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class VariablePlaygroundComponent implements OnInit {
  @Input() config: any;

  typeKeys = ['byte', 'short', 'int', 'long', 'float', 'double', 'char', 'boolean', 'String'];

  type = 'int';
  name = 'myAge';
  value = '25';
  isFinal = false;
  nameValid = true;
  nameError = '';

  typeMeta: Record<string, TypeMeta> = {
    'byte':    { description: 'tiny integers',   range: 'Whole numbers from −128 to 127 (1 byte)',                    group: 'integer', sliderMin: -128,  sliderMax: 127 },
    'short':   { description: 'small integers',  range: 'Whole numbers from −32,768 to 32,767 (2 bytes)',             group: 'integer', sliderMin: -100,  sliderMax: 100 },
    'int':     { description: 'whole numbers',   range: 'Whole numbers from −2,147,483,648 to 2,147,483,647 (4 bytes)', group: 'integer', sliderMin: -100, sliderMax: 100 },
    'long':    { description: 'large integers',  range: 'Very large whole numbers up to ±9.2 × 10¹⁸ (8 bytes)',      group: 'integer' },
    'float':   { description: 'decimal (32-bit)', range: 'Decimal numbers with ~7 digits of precision (4 bytes)',     group: 'decimal', suffix: 'f' },
    'double':  { description: 'decimal (64-bit)', range: 'Decimal numbers with ~15 digits of precision (8 bytes)',    group: 'decimal' },
    'char':    { description: 'single character', range: 'One Unicode character stored in single quotes, e.g. \'A\'', group: 'char' },
    'boolean': { description: 'true or false',   range: 'Only two possible values: true or false (1 bit)',            group: 'boolean' },
    'String':  { description: 'text',            range: 'Any sequence of characters — letters, words, or sentences', group: 'text' },
  };

  ngOnInit() {
    if (this.config) {
      if (this.config.type)  this.type  = this.config.type;
      if (this.config.name)  this.name  = this.config.name;
      if (this.config.value) this.value = this.config.value;
    }
    this.validateName();
  }

  selectType(t: string) {
    this.type = t;
    const defaults: Record<string, string> = {
      byte: '42', short: '1000', int: '25', long: '1234567890',
      float: '19.99', double: '3.14', char: 'A', boolean: 'true', String: 'Hello',
    };
    this.value = defaults[t] ?? '';
  }

  validateName() {
    if (!this.name) { this.nameValid = true; this.nameError = ''; return; }
    if (/^\d/.test(this.name)) {
      this.nameValid = false; this.nameError = 'Variable names cannot start with a number'; return;
    }
    if (/\s/.test(this.name)) {
      this.nameValid = false; this.nameError = 'Variable names cannot contain spaces'; return;
    }
    if (/[^a-zA-Z0-9_$]/.test(this.name)) {
      this.nameValid = false; this.nameError = 'Only letters, numbers, _ and $ are allowed'; return;
    }
    this.nameValid = true; this.nameError = '';
  }

  formatValue(): string {
    const v = this.value;
    if (this.type === 'String') return `"${v || ''}"`;
    if (this.type === 'char')   return `'${v || ' '}'`;
    if (this.type === 'float')  return `${v || '0.0'}f`;
    if (this.type === 'long')   return `${v || '0'}L`;
    if (this.type === 'double' && v !== '' && !String(v).includes('.')) return `${v}.0`;
    return v || (this.type === 'boolean' ? 'true' : '0');
  }

  displayValue(): string {
    if (this.type === 'boolean') return this.value || 'true';
    if (this.type === 'char')    return this.value || 'A';
    return this.value || '?';
  }

  valuePlaceholder(): string {
    const map: Record<string, string> = {
      byte: 'e.g. 42', short: 'e.g. 1000', int: 'e.g. 25', long: 'e.g. 1234567890',
      float: 'e.g. 19.99', double: 'e.g. 3.14', char: 'e.g. A', String: 'e.g. Hello World',
    };
    return map[this.type] ?? '';
  }

  valueHint(): string {
    const map: Record<string, string> = {
      float:  'Java adds f suffix — e.g. 19.99f',
      long:   'Java adds L suffix — e.g. 1234567890L',
      double: 'Use a decimal point — e.g. 3.14',
      char:   'One character only — stored in single quotes',
      String: 'Wrapped in double quotes automatically',
    };
    return map[this.type] ?? '';
  }
}
