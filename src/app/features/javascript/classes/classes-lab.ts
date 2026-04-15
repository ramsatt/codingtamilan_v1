
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentStateService } from '../../../services/content-state';

class Animal {
  constructor(public name: string) {}
  
  speak(): string {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  override speak(): string {
    return `${this.name} barks! Woof!`;
  }
}

class Cat extends Animal {
  override speak(): string {
    return `${this.name} meows.`;
  }
}

@Component({
  selector: 'app-js-classes-lab',
  imports: [CommonModule],
  template: `
    <section id="classes" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-amber-500 pl-4">JS Classes</h3>
        <p class="article-body">
            ES6 introduced <code class="bg-amber-100 px-1 rounded text-amber-900 font-bold text-sm">class</code> syntax, which is syntactic sugar over prototypal inheritance.
        </p>
      </div>

      <!-- Inheritance Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-amber-100 text-amber-700 rounded text-xs">OOP</span> Inheritance
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                 <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 relative shadow-inner">
                    <span class="code-keyword">class</span> Animal {{ '{' }} <br>
                    &nbsp;&nbsp;speak() {{ '{' }} ... {{ '}' }} <br>
                    {{ '}' }} <br><br>
                    <span class="code-keyword">class</span> Dog <span class="text-amber-400">extends</span> Animal {{ '{' }} <br>
                    &nbsp;&nbsp;speak() {{ '{' }} ... {{ '}' }} <br>
                    {{ '}' }}
                </div>
                
                <div class="flex gap-2">
                    <button (click)="createDog()" class="flex-1 bg-amber-600 text-white font-bold py-2 rounded shadow hover:bg-amber-700 transition active:scale-95 text-sm">
                        New Dog
                    </button>
                    <button (click)="createCat()" class="flex-1 bg-slate-600 text-white font-bold py-2 rounded shadow hover:bg-slate-700 transition active:scale-95 text-sm">
                        New Cat
                    </button>
                </div>
            </div>

            <div class="bg-slate-50 p-6 rounded border border-slate-200 flex flex-col gap-3 min-h-[150px]">
                <div *ngFor="let animal of zoo; let i = index" class="bg-white p-3 rounded shadow-sm border border-slate-200 flex justify-between items-center animate-popIn">
                    <div class="flex items-center gap-3">
                         <div class="w-8 h-8 rounded-full flex items-center justify-center text-lg bg-slate-100">
                             {{ getIcon(animal) }}
                         </div>
                         <div>
                             <div class="text-sm font-bold text-slate-800">{{ animal.name }}</div>
                             <div class="text-xs text-slate-500 italic">"{{ animal.speak() }}"</div>
                         </div>
                    </div>
                    <button (click)="removeAnimal(i)" class="text-slate-300 hover:text-red-500 text-xs">✕</button>
                </div>
                <div *ngIf="zoo.length === 0" class="flex flex-col items-center justify-center text-slate-300 h-full py-4">
                    <div class="text-2xl mb-2">🐾</div>
                    <div class="text-sm italic">Zoo is empty</div>
                </div>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .animate-popIn { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `
})
export class ClassesLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  zoo: Animal[] = [];
  Dog = Dog; // To use in template

  createDog() {
      const names = ['Buddy', 'Max', 'Charlie', 'Bella'];
      const name = names[Math.floor(Math.random() * names.length)];
      this.zoo.unshift(new Dog(name));
  }

  createCat() {
      const names = ['Luna', 'Milo', 'Oliver', 'Leo'];
      const name = names[Math.floor(Math.random() * names.length)];
      this.zoo.unshift(new Cat(name));
  }

  removeAnimal(index: number) {
      this.zoo.splice(index, 1);
  }

  getIcon(animal: Animal): string {
      return animal instanceof Dog ? '🐶' : '🐱';
  }
}
