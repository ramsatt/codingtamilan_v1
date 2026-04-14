import { Component } from '@angular/core';

interface Modifier {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  sameClass: boolean;
  samePackage: boolean;
  subclass: boolean;
  otherPackage: boolean;
  description: string;
}

const MODIFIERS: Modifier[] = [
  {
    name: 'public', color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-400',
    sameClass: true, samePackage: true, subclass: true, otherPackage: true,
    description: 'Accessible from everywhere — any class, any package.'
  },
  {
    name: 'protected', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-400',
    sameClass: true, samePackage: true, subclass: true, otherPackage: false,
    description: 'Accessible within the same package and by subclasses in other packages.'
  },
  {
    name: 'default (no modifier)', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-400',
    sameClass: true, samePackage: true, subclass: false, otherPackage: false,
    description: 'Also called "package-private". Only accessible within the same package.'
  },
  {
    name: 'private', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-400',
    sameClass: true, samePackage: false, subclass: false, otherPackage: false,
    description: 'Most restrictive. Only accessible within the same class.'
  },
];

@Component({
  selector: 'app-modifiers-playground',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Access Modifiers Matrix</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Modifier selector -->
        <div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Select a Modifier</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            @for (m of modifiers; track m.name) {
              <button (click)="active = m"
                class="px-3 py-2.5 rounded-xl border-2 text-left transition-all"
                [class.border-2]="true"
                [class]="active?.name === m.name ? m.borderColor + ' ' + m.bgColor : 'border-slate-100 bg-slate-50'">
                <p class="font-mono text-xs font-bold"
                  [class]="active?.name === m.name ? m.color : 'text-slate-600'">{{ m.name }}</p>
              </button>
            }
          </div>
        </div>

        <!-- Access matrix -->
        <div class="overflow-x-auto rounded-xl border border-slate-200">
          <table class="w-full text-xs">
            <thead>
              <tr class="bg-slate-800 text-white">
                <th class="px-4 py-3 text-left font-bold uppercase tracking-wider">Modifier</th>
                <th class="px-4 py-3 text-center font-bold uppercase tracking-wider">Same Class</th>
                <th class="px-4 py-3 text-center font-bold uppercase tracking-wider">Same Package</th>
                <th class="px-4 py-3 text-center font-bold uppercase tracking-wider">Subclass</th>
                <th class="px-4 py-3 text-center font-bold uppercase tracking-wider">Other Package</th>
              </tr>
            </thead>
            <tbody>
              @for (m of modifiers; track m.name; let even = $even) {
                <tr class="border-t border-slate-100 cursor-pointer transition-colors hover:bg-slate-50"
                  [class.ring-2]="active?.name === m.name"
                  [class]="even ? 'bg-white' : 'bg-slate-50/50'"
                  (click)="active = m">
                  <td class="px-4 py-3 font-mono font-bold" [class]="m.color">{{ m.name }}</td>
                  @for (col of ['sameClass','samePackage','subclass','otherPackage']; track col) {
                    <td class="px-4 py-3 text-center">
                      @if (getAccess(m, col)) {
                        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 font-black">✓</span>
                      } @else {
                        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 font-black">✗</span>
                      }
                    </td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Detail panel -->
        @if (active) {
          <div class="rounded-xl border-2 p-4 space-y-2 transition-all"
            [class]="active.borderColor + ' ' + active.bgColor">
            <h3 class="font-mono font-black text-sm" [class]="active.color">{{ active.name }}</h3>
            <p class="text-xs text-slate-600 leading-relaxed">{{ active.description }}</p>
            <div class="bg-slate-950 rounded-lg p-3 font-mono text-xs">
              <span class="text-emerald-400">{{ active.name === 'default (no modifier)' ? '' : active.name + ' ' }}</span>
              <span class="text-blue-400">int</span>
              <span class="text-white"> myNumber = </span>
              <span class="text-emerald-400">42</span>
              <span class="text-slate-400">;</span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class ModifiersPlaygroundComponent {
  modifiers = MODIFIERS;
  active: Modifier | null = MODIFIERS[0];

  getAccess(m: Modifier, col: string): boolean {
    return (m as any)[col] as boolean;
  }
}
