import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Attribute {
  name: string;
  type: string;
  value: string | number;
  inputType: 'text' | 'number' | 'slider';
  min?: number;
  max?: number;
}

interface ClassTemplate {
  id: string;
  label: string;
  icon: string;
  className: string;
  description: string;
  attributes: Attribute[];
  methods: { name: string; returnType: string; body: (attrs: Attribute[]) => string; code: string }[];
}

const TEMPLATES: ClassTemplate[] = [
  {
    id: 'car',
    label: 'Car',
    icon: '🚗',
    className: 'Car',
    description: 'A Car has a brand, colour and speed. Call accelerate() to increase speed.',
    attributes: [
      { name: 'brand',  type: 'String', value: 'Toyota', inputType: 'text' },
      { name: 'color',  type: 'String', value: 'Red',    inputType: 'text' },
      { name: 'speed',  type: 'int',    value: 60,       inputType: 'slider', min: 0, max: 200 },
    ],
    methods: [
      {
        name: 'describe', returnType: 'String',
        code: 'return brand + " (" + color + ") at " + speed + " km/h";',
        body: attrs => {
          const b = attrs[0].value, c = attrs[1].value, s = attrs[2].value;
          return `${b} (${c}) at ${s} km/h`;
        }
      },
      {
        name: 'accelerate', returnType: 'void',
        code: 'speed += 20;  System.out.println("Speed: " + speed);',
        body: attrs => `Speed: ${Number(attrs[2].value) + 20} km/h`
      },
    ]
  },
  {
    id: 'student',
    label: 'Student',
    icon: '🎓',
    className: 'Student',
    description: 'A Student has a name, age, and score. Call getGrade() to evaluate performance.',
    attributes: [
      { name: 'name',  type: 'String', value: 'Priya',  inputType: 'text' },
      { name: 'age',   type: 'int',    value: 18,       inputType: 'slider', min: 5, max: 30 },
      { name: 'score', type: 'int',    value: 85,       inputType: 'slider', min: 0, max: 100 },
    ],
    methods: [
      {
        name: 'introduce', returnType: 'String',
        code: 'return "I am " + name + ", aged " + age;',
        body: attrs => `I am ${attrs[0].value}, aged ${attrs[1].value}`
      },
      {
        name: 'getGrade', returnType: 'String',
        code: 'if (score >= 90) return "A";\nelse if (score >= 75) return "B";\nelse if (score >= 50) return "C";\nelse return "F";',
        body: attrs => {
          const s = Number(attrs[2].value);
          return s >= 90 ? 'A — Excellent!' : s >= 75 ? 'B — Good' : s >= 50 ? 'C — Passed' : 'F — Failed';
        }
      },
    ]
  },
  {
    id: 'rectangle',
    label: 'Rectangle',
    icon: '📐',
    className: 'Rectangle',
    description: 'A Rectangle has width and height. Call area() and perimeter() for calculations.',
    attributes: [
      { name: 'width',  type: 'int', value: 8, inputType: 'slider', min: 1, max: 30 },
      { name: 'height', type: 'int', value: 5, inputType: 'slider', min: 1, max: 30 },
    ],
    methods: [
      {
        name: 'area', returnType: 'int',
        code: 'return width * height;',
        body: attrs => `${Number(attrs[0].value) * Number(attrs[1].value)}`
      },
      {
        name: 'perimeter', returnType: 'int',
        code: 'return 2 * (width + height);',
        body: attrs => `${2 * (Number(attrs[0].value) + Number(attrs[1].value))}`
      },
    ]
  },
  {
    id: 'bankaccount',
    label: 'BankAccount',
    icon: '🏦',
    className: 'BankAccount',
    description: 'A BankAccount has an owner and balance. Call deposit() to add money.',
    attributes: [
      { name: 'owner',   type: 'String', value: 'Kumar',   inputType: 'text' },
      { name: 'balance', type: 'double', value: 1500,      inputType: 'slider', min: 0, max: 10000 },
    ],
    methods: [
      {
        name: 'getInfo', returnType: 'String',
        code: 'return owner + " — ₹" + balance;',
        body: attrs => `${attrs[0].value} — ₹${attrs[1].value}`
      },
      {
        name: 'deposit', returnType: 'void',
        code: 'balance += 500;\nSystem.out.println("New balance: ₹" + balance);',
        body: attrs => `New balance: ₹${Number(attrs[1].value) + 500}`
      },
    ]
  },
];

@Component({
  selector: 'app-class-object-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <!-- Header -->
      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
          <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Class &amp; Object Builder</span>
        </div>
        <span class="text-[10px] text-slate-400 font-medium">Edit attributes → create an object → call methods</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Template selector -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Choose a Class</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            @for (t of templates; track t.id) {
              <button (click)="selectTemplate(t)"
                class="px-3 py-2.5 rounded-xl border-2 text-left transition-all"
                [class.border-brand-500]="tmpl.id === t.id"
                [class.bg-brand-50]="tmpl.id === t.id"
                [class.border-slate-100]="tmpl.id !== t.id"
                [class.bg-slate-50]="tmpl.id !== t.id">
                <p class="text-base mb-0.5">{{ t.icon }}</p>
                <p class="text-[10px] font-bold leading-tight"
                  [class.text-brand-700]="tmpl.id === t.id"
                  [class.text-slate-600]="tmpl.id !== t.id">{{ t.label }}</p>
              </button>
            }
          </div>
          <p class="text-xs text-slate-500 mt-2 leading-relaxed">{{ tmpl.description }}</p>
        </div>

        <div class="grid lg:grid-cols-3 gap-5">

          <!-- Column 1: Class blueprint -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <span class="mr-1">🏗️</span> Class Blueprint
            </p>
            <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5">
              <div><span class="text-purple-400">class </span><span class="text-amber-300">{{ tmpl.className }}</span><span class="text-slate-300"> &#123;</span></div>
              <div class="h-1"></div>
              @for (attr of attrs; track attr.name) {
                <div class="pl-4">
                  <span class="text-blue-400">{{ attr.type }} </span>
                  <span class="text-white">{{ attr.name }}</span>
                  <span class="text-slate-500">;</span>
                </div>
              }
              <div class="h-1"></div>
              @for (m of tmpl.methods; track m.name) {
                <div class="pl-4">
                  <span class="text-blue-400">{{ m.returnType }} </span>
                  <span class="text-emerald-400">{{ m.name }}</span>
                  <span class="text-slate-300">() &#123;</span>
                </div>
                <div class="pl-8 text-slate-500 text-[10px] italic whitespace-pre-wrap">{{ m.code }}</div>
                <div class="pl-4"><span class="text-slate-300">&#125;</span></div>
              }
              <div class="h-1"></div>
              <div><span class="text-slate-300">&#125;</span></div>
            </div>
          </div>

          <!-- Column 2: Object instance (edit attributes) -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <span class="mr-1">📦</span> Object Instance
            </p>

            <!-- Object creation code -->
            <div class="bg-slate-950 rounded-xl border border-slate-800 px-4 py-3 font-mono text-xs mb-3">
              <div>
                <span class="text-amber-300">{{ tmpl.className }} </span>
                <span class="text-white">obj = </span>
                <span class="text-purple-400">new </span>
                <span class="text-amber-300">{{ tmpl.className }}</span>
                <span class="text-slate-300">();</span>
              </div>
            </div>

            <!-- Attribute editors -->
            <div class="space-y-3">
              @for (attr of attrs; track attr.name; let i = $index) {
                <div class="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="font-mono text-[10px] font-bold">
                      <span class="text-blue-600">{{ attr.type }}</span>
                      <span class="text-slate-700"> obj.{{ attr.name }}</span>
                    </label>
                    @if (attr.inputType === 'slider') {
                      <span class="font-mono text-sm font-black text-slate-800">{{ attr.value }}</span>
                    }
                  </div>
                  @if (attr.inputType === 'slider') {
                    <input type="range" [min]="attr.min" [max]="attr.max" [value]="attr.value"
                      (input)="onSlider(i, $event)"
                      class="w-full accent-brand-500 cursor-pointer">
                  } @else {
                    <input type="text" [(ngModel)]="attrs[i].value" (ngModelChange)="onAttrChange()"
                      class="w-full font-mono text-sm border-2 border-slate-200 focus:border-brand-500 rounded-lg px-2 py-1.5 outline-none bg-white transition-all">
                  }
                </div>
              }
            </div>
          </div>

          <!-- Column 3: Call methods + output -->
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              <span class="mr-1">⚡</span> Call Methods
            </p>
            <div class="space-y-3">
              @for (m of tmpl.methods; track m.name; let i = $index) {
                <div class="rounded-xl border-2 overflow-hidden transition-all"
                  [class.border-brand-400]="activeMethod === i"
                  [class.border-slate-100]="activeMethod !== i">

                  <!-- Method call -->
                  <div class="px-3 py-2 flex items-center justify-between"
                    [class.bg-brand-50]="activeMethod === i"
                    [class.bg-slate-50]="activeMethod !== i">
                    <span class="font-mono text-xs font-bold"
                      [class.text-brand-700]="activeMethod === i"
                      [class.text-slate-600]="activeMethod !== i">
                      obj.{{ m.name }}()
                    </span>
                    <button (click)="callMethod(i)"
                      class="text-[10px] font-black px-2.5 py-1 rounded-lg transition-all"
                      [class.bg-brand-500]="activeMethod !== i"
                      [class.text-white]="activeMethod !== i"
                      [class.bg-white]="activeMethod === i"
                      [class.text-brand-600]="activeMethod === i">
                      <i class="fa-solid fa-play mr-1 text-[8px]"></i>Run
                    </button>
                  </div>

                  <!-- Result -->
                  @if (activeMethod === i) {
                    <div class="px-3 py-2 bg-brand-500 text-white font-mono text-xs">
                      <i class="fa-solid fa-terminal text-brand-200 mr-1.5 text-[10px]"></i>
                      {{ methodResults[i] }}
                    </div>
                  }
                </div>
              }
            </div>

            <!-- Object state summary -->
            <div class="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current State</p>
              @for (attr of attrs; track attr.name) {
                <div class="flex items-center justify-between text-xs py-0.5">
                  <span class="text-slate-500 font-mono">obj.{{ attr.name }}</span>
                  <span class="font-mono font-bold text-slate-800">
                    {{ attr.type === 'String' ? '"' + attr.value + '"' : attr.value }}
                  </span>
                </div>
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ClassObjectPlaygroundComponent {
  templates = TEMPLATES;
  tmpl = TEMPLATES[0];
  attrs: Attribute[] = [];
  activeMethod: number | null = null;
  methodResults: string[] = [];

  constructor() { this.initTemplate(); }

  selectTemplate(t: ClassTemplate) {
    this.tmpl = t;
    this.initTemplate();
  }

  initTemplate() {
    this.attrs = this.tmpl.attributes.map(a => ({ ...a }));
    this.activeMethod = null;
    this.methodResults = this.tmpl.methods.map(() => '');
  }

  onSlider(i: number, event: Event) {
    this.attrs[i].value = parseFloat((event.target as HTMLInputElement).value);
    this.refreshActiveMethod();
  }

  onAttrChange() {
    this.refreshActiveMethod();
  }

  callMethod(i: number) {
    this.activeMethod = i;
    this.methodResults[i] = this.tmpl.methods[i].body(this.attrs);
  }

  private refreshActiveMethod() {
    if (this.activeMethod !== null) {
      this.methodResults[this.activeMethod] = this.tmpl.methods[this.activeMethod].body(this.attrs);
    }
  }
}
