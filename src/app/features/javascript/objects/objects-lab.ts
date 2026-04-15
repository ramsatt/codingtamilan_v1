

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentStateService } from '../../../services/content-state';

class UserClass {
  constructor(public name: string, public role: string = 'Member') {}
}

@Component({
  selector: 'app-js-objects-lab',
  imports: [CommonModule, FormsModule],
  template: `
    <section id="objects" class="scroll-mt-8 space-y-8">
      <!-- Header -->
      <div>
        <h3 class="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-orange-500 pl-4">9. Objects & Classes</h3>
        <p class="article-body">
            <span class="font-bold text-slate-800">Objects</span> store data in key-value pairs. 
            <span class="font-bold text-slate-800">Classes</span> (ES6) are templates for creating objects, providing a cleaner syntax for constructor functions and inheritance.
        </p>
      </div>

      <!-- Object Literal Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-orange-100 text-orange-700 rounded text-xs">Literal</span> Dynamic Object
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Editor -->
            <div class="space-y-4">
                <div class="text-xs font-bold text-slate-500 uppercase">Edit Properties</div>
                
                <div class="space-y-3">
                    <div>
                        <label class="text-xs text-slate-300 font-bold block mb-1">user.name</label>
                        <input [(ngModel)]="user.name" class="w-full p-2 border rounded font-mono text-sm focus:border-orange-400 outline-none">
                    </div>
                    <div>
                         <label class="text-xs text-slate-300 font-bold block mb-1">user.role</label>
                         <select [(ngModel)]="user.role" class="w-full p-2 border rounded font-mono text-sm bg-white">
                             <option value="Admin">Admin</option>
                             <option value="Developer">Developer</option>
                             <option value="Designer">Designer</option>
                         </select>
                    </div>
                    <div>
                        <label class="text-xs text-slate-300 font-bold block mb-1">user.isActive</label>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" [(ngModel)]="user.isActive" class="w-4 h-4 text-orange-600 rounded">
                            <span class="text-sm text-slate-600">Active Status</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Visualization -->
            <div class="bg-slate-900 rounded p-6 font-mono text-sm text-slate-300 relative shadow-inner flex flex-col justify-center">
                <div class="absolute top-2 right-2 text-[10px] text-slate-500 font-bold uppercase">console.log(user)</div>
                
                <span>{{ '{' }}</span>
                <div class="pl-4">
                    <span class="text-purple-400">name</span>: <span class="text-green-400">"{{ user.name }}"</span>,
                </div>
                <div class="pl-4">
                    <span class="text-purple-400">role</span>: <span class="text-green-400">"{{ user.role }}"</span>,
                </div>
                <div class="pl-4">
                    <span class="text-purple-400">isActive</span>: <span class="text-orange-400">{{ user.isActive }}</span>,
                </div>
                <div class="pl-4">
                     <span class="text-blue-400">greet</span>: <span class="text-yellow-400">function()</span> {{ '{' }} ... {{ '}' }}
                </div>
                <span>{{ '}' }}</span>

                <div class="mt-4 pt-4 border-t border-slate-700">
                    <button (click)="user.greet()" class="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded border border-slate-600">
                        user.greet()
                    </button>
                    <div *ngIf="greetMsg" class="mt-2 text-green-400 text-xs italic">
                        "{{ greetMsg }}"
                    </div>
                </div>
            </div>

        </div>
      </div>

      <!-- Class Visualizer -->
      <div class="glass-panel rounded-xl p-6 shadow-sm bg-white border border-slate-100">
        <h4 class="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span class="p-1 bg-blue-100 text-blue-700 rounded text-xs">Blueprint</span> ES6 Classes
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Class Definition -->
            <div class="space-y-4">
                <div class="text-xs font-bold text-slate-500 uppercase">Class Definition</div>
                <div class="bg-slate-900 rounded p-4 font-mono text-xs text-slate-300 shadow-inner overflow-hidden leading-relaxed">
                    <span class="code-keyword">class</span> User {{ '{' }} <br>
                    &nbsp;&nbsp;<span class="code-keyword">constructor</span>(name, role) {{ '{' }} <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">this</span>.name = name; <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">this</span>.role = role || 'Member'; <br>
                    &nbsp;&nbsp;{{ '}' }} <br>
                    {{ '}' }}
                </div>
                
                <div class="space-y-2">
                    <label class="text-xs font-bold text-slate-500 uppercase">New Instance</label>
                    <div class="flex gap-2">
                        <input [(ngModel)]="newUserName" (keyup.enter)="createUser()" placeholder="Enter Name" class="flex-1 p-2 border rounded text-sm outline-none focus:border-blue-400">
                        <button (click)="createUser()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold text-xs transition active:scale-95">
                            new User()
                        </button>
                    </div>
                </div>
            </div>

            <!-- Instances -->
            <div class="bg-slate-50 p-6 rounded border border-slate-200 min-h-[200px]">
                <div class="text-xs font-bold text-slate-500 uppercase mb-4">Active Instances (Memory)</div>
                
                <div class="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                    <div *ngFor="let u of users; let i = index" class="bg-white p-3 rounded shadow-sm border border-slate-100 flex justify-between items-center animate-popIn">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                                {{ u.name.charAt(0) }}
                            </div>
                            <div>
                                <div class="font-bold text-sm text-slate-700">{{ u.name }}</div>
                                <div class="text-[10px] text-slate-300 font-mono">Role: {{ u.role }}</div>
                            </div>
                        </div>
                        <button (click)="removeUser(i)" class="text-slate-300 hover:text-red-500 transition px-2">✕</button>
                    </div>
                    
                    <div *ngIf="users.length === 0" class="text-center text-slate-300 italic text-sm py-8">
                        const users = [];
                    </div>
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
export class ObjectsLab implements OnInit {
  private contentState = inject(ContentStateService);

  ngOnInit() {
    this.contentState.hasContent.set(true);
  }

  greetMsg = '';

  user = {
    name: 'Coding Tamilan',
    role: 'Developer',
    isActive: true,
    greet: () => {
       this.greetMsg = `Hello, I'm ${this.user.name} the ${this.user.role}!`;
       setTimeout(() => this.greetMsg = '', 3000);
    }
  };

  // Class Demo
  users: UserClass[] = [];
  newUserName = '';

  createUser() {
    if (!this.newUserName) return;
    const role = Math.random() > 0.5 ? 'Member' : 'Guest';
    this.users.unshift(new UserClass(this.newUserName, role));
    this.newUserName = '';
  }

  removeUser(index: number) {
    this.users.splice(index, 1);
  }
}
