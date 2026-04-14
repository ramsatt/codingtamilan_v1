import { Component, OnInit } from '@angular/core';

interface DataTypeInfo {
  name: string;
  category: 'integer' | 'decimal' | 'boolean' | 'char';
  bytes: number;
  min: string;
  max: string;
  example: string;
  tip: string;
  defaultValue: string;
}

@Component({
  selector: 'app-data-type-explorer',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Primitive Types Explorer</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Click any type to explore</span>
      </div>

      <div class="p-6 space-y-6">

        <!-- Category groups -->
        @for (cat of categories; track cat.key) {
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span class="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                [class.bg-blue-100]="cat.key === 'integer'"
                [class.text-blue-700]="cat.key === 'integer'"
                [class.bg-violet-100]="cat.key === 'decimal'"
                [class.text-violet-700]="cat.key === 'decimal'"
                [class.bg-emerald-100]="cat.key === 'boolean'"
                [class.text-emerald-700]="cat.key === 'boolean'"
                [class.bg-amber-100]="cat.key === 'char'"
                [class.text-amber-700]="cat.key === 'char'">
                {{ cat.label }}
              </span>
              <div class="flex-1 h-px bg-slate-100"></div>
            </div>
            <div class="flex flex-wrap gap-2">
              @for (t of typesInCategory(cat.key); track t.name) {
                <button (click)="select(t)"
                  class="px-4 py-2.5 rounded-xl border-2 font-mono text-sm font-bold transition-all"
                  [class.border-brand-500]="selected?.name === t.name"
                  [class.bg-brand-50]="selected?.name === t.name"
                  [class.text-brand-700]="selected?.name === t.name"
                  [class.scale-105]="selected?.name === t.name"
                  [class.border-slate-100]="selected?.name !== t.name"
                  [class.bg-slate-50]="selected?.name !== t.name"
                  [class.text-slate-600]="selected?.name !== t.name">
                  {{ t.name }}
                </button>
              }
            </div>
          </div>
        }

        <!-- Detail Panel -->
        @if (selected) {
          <div class="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50/50 transition-all">

            <!-- Detail header -->
            <div class="px-5 py-3 bg-white border-b border-slate-100 flex items-center gap-3">
              <span class="font-mono text-xl font-black text-slate-900">{{ selected.name }}</span>
              <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full"
                [class.bg-blue-100]="selected.category === 'integer'"
                [class.text-blue-700]="selected.category === 'integer'"
                [class.bg-violet-100]="selected.category === 'decimal'"
                [class.text-violet-700]="selected.category === 'decimal'"
                [class.bg-emerald-100]="selected.category === 'boolean'"
                [class.text-emerald-700]="selected.category === 'boolean'"
                [class.bg-amber-100]="selected.category === 'char'"
                [class.text-amber-700]="selected.category === 'char'">
                {{ selected.category }}
              </span>
            </div>

            <div class="p-5 grid md:grid-cols-2 gap-5">

              <!-- Left: Size + Range -->
              <div class="space-y-4">

                <!-- Memory size -->
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Memory Size</p>
                  <div class="flex items-center gap-2 flex-wrap">
                    @for (b of byteBlocks(selected.bytes); track $index) {
                      <div class="w-9 h-9 rounded-lg flex items-center justify-center text-[9px] font-black text-white shadow-sm"
                        [class.bg-brand-500]="b === 'used'"
                        [class.bg-slate-200]="b === 'empty'">
                        @if (b === 'used') { 1B }
                      </div>
                    }
                    <span class="text-sm font-bold text-slate-500 ml-1">
                      {{ selected.bytes === 0.125 ? '1 bit' : selected.bytes + (selected.bytes === 1 ? ' byte' : ' bytes') }}
                      ({{ selected.bytes === 0.125 ? '1' : selected.bytes * 8 }} {{ selected.bytes === 0.125 ? 'bit' : 'bits' }})
                    </span>
                  </div>
                </div>

                <!-- Range -->
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Value Range</p>
                  <div class="bg-white rounded-xl border border-slate-200 p-3 space-y-1.5">
                    <div class="flex justify-between items-center">
                      <span class="text-[10px] text-slate-400 font-medium">Min</span>
                      <span class="font-mono text-xs font-bold text-red-500">{{ selected.min }}</span>
                    </div>
                    <div class="h-px bg-slate-100"></div>
                    <div class="flex justify-between items-center">
                      <span class="text-[10px] text-slate-400 font-medium">Max</span>
                      <span class="font-mono text-xs font-bold text-emerald-600">{{ selected.max }}</span>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Right: Example + Tip -->
              <div class="space-y-4">

                <!-- Code example -->
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Example Declaration</p>
                  <div class="bg-slate-950 rounded-xl p-4 border border-slate-800">
                    <div class="font-mono text-sm">
                      <span class="text-blue-400">{{ selected.name }}</span>
                      <span class="text-white"> myVar </span>
                      <span class="text-slate-400">= </span>
                      <span class="text-emerald-400">{{ selected.defaultValue }}</span>
                      <span class="text-slate-500">;</span>
                    </div>
                  </div>
                </div>

                <!-- Tip -->
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Best Used When</p>
                  <div class="bg-brand-50 border border-brand-100 rounded-xl p-3 flex gap-2.5">
                    <i class="fa-solid fa-lightbulb text-brand-500 mt-0.5 shrink-0 text-sm"></i>
                    <p class="text-xs text-brand-800 leading-relaxed">{{ selected.tip }}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        } @else {
          <div class="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-400 text-sm">
            <i class="fa-solid fa-hand-pointer text-2xl mb-2 block text-slate-300"></i>
            Select a data type above to see its details
          </div>
        }

      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class DataTypeExplorerComponent implements OnInit {
  selected: DataTypeInfo | null = null;

  categories = [
    { key: 'integer' as const, label: '🔢 Integer Types' },
    { key: 'decimal' as const, label: '💧 Decimal Types' },
    { key: 'boolean' as const, label: '⚡ Logical' },
    { key: 'char'   as const, label: '🔤 Character' },
  ];

  types: DataTypeInfo[] = [
    {
      name: 'byte', category: 'integer', bytes: 1,
      min: '-128', max: '127',
      example: 'byte b = 100;',
      defaultValue: '100',
      tip: 'You need to save memory and the value fits in a small range (e.g. pixel values, file data).'
    },
    {
      name: 'short', category: 'integer', bytes: 2,
      min: '-32,768', max: '32,767',
      example: 'short s = 5000;',
      defaultValue: '5000',
      tip: 'You need a slightly larger range than byte but still want to save memory.'
    },
    {
      name: 'int', category: 'integer', bytes: 4,
      min: '-2,147,483,648', max: '2,147,483,647',
      example: 'int age = 25;',
      defaultValue: '25',
      tip: 'You need whole numbers for most everyday uses — counting, indexing, or arithmetic. The go-to integer type.'
    },
    {
      name: 'long', category: 'integer', bytes: 8,
      min: '-9,223,372,036,854,775,808', max: '9,223,372,036,854,775,807',
      example: 'long pop = 8000000000L;',
      defaultValue: '8000000000L',
      tip: 'You need very large whole numbers, like world population, timestamps in milliseconds, or large IDs.'
    },
    {
      name: 'float', category: 'decimal', bytes: 4,
      min: '~1.4E-45', max: '~3.4E+38',
      example: 'float pi = 3.14f;',
      defaultValue: '3.14f',
      tip: 'Memory is tight and you only need ~7 digits of precision. Note: the value must end with f.'
    },
    {
      name: 'double', category: 'decimal', bytes: 8,
      min: '~4.9E-324', max: '~1.8E+308',
      example: 'double price = 19.99;',
      defaultValue: '19.99',
      tip: 'You need decimal precision — prices, scientific calculations, measurements. The default decimal type in Java.'
    },
    {
      name: 'boolean', category: 'boolean', bytes: 0.125,
      min: 'false', max: 'true',
      example: 'boolean isActive = true;',
      defaultValue: 'true',
      tip: 'You need a yes/no, on/off, or true/false value — flags, conditions, login status, toggle states.'
    },
    {
      name: 'char', category: 'char', bytes: 2,
      min: "'\\u0000' (0)", max: "'\\uFFFF' (65,535)",
      example: "char grade = 'A';",
      defaultValue: "'A'",
      tip: "You need to store a single letter, digit, or symbol. Use String for multiple characters."
    },
  ];

  typesInCategory(cat: DataTypeInfo['category']): DataTypeInfo[] {
    return this.types.filter(t => t.category === cat);
  }

  byteBlocks(bytes: number): ('used' | 'empty')[] {
    if (bytes === 0.125) return ['used'];          // boolean = 1 bit, show 1 block
    const filled = Math.min(bytes, 8);
    const empty  = 8 - filled;
    return [
      ...Array(filled).fill('used'),
      ...Array(empty).fill('empty'),
    ];
  }

  select(t: DataTypeInfo) {
    this.selected = this.selected?.name === t.name ? null : t;
  }

  ngOnInit() {
    this.selected = this.types.find(t => t.name === 'int') ?? null;
  }
}
