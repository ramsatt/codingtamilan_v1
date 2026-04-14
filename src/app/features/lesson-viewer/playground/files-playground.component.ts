import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Tab = 'write' | 'read' | 'append';

@Component({
  selector: 'app-files-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">File I/O Simulator</span>
      </div>

      <div class="p-6 space-y-5">

        <!-- Tabs -->
        <div class="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
          @for (t of tabs; track t.id) {
            <button (click)="currentTab = t.id"
              class="px-4 py-2 rounded-lg text-xs font-black transition-all"
              [class.bg-white]="currentTab === t.id"
              [class.shadow]="currentTab === t.id"
              [class.text-brand-600]="currentTab === t.id"
              [class.text-slate-500]="currentTab !== t.id">
              {{ t.icon }} {{ t.label }}
            </button>
          }
        </div>

        <!-- WRITE tab -->
        @if (currentTab === 'write') {
          <div class="space-y-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">File Name</label>
                <input [(ngModel)]="filename" placeholder="e.g. notes.txt"
                  class="w-full font-mono text-sm border-2 border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-400">
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Content to Write</label>
                <textarea [(ngModel)]="writeContent" rows="3" placeholder="Type content here..."
                  class="w-full font-mono text-sm border-2 border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-400 resize-none"></textarea>
              </div>
            </div>
            <button (click)="writeFile()"
              class="w-full py-2.5 bg-brand-500 hover:bg-brand-400 text-white text-xs font-black rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
              <i class="fa-solid fa-floppy-disk"></i> Write to File
            </button>
            <div class="bg-slate-900 rounded-xl p-4 font-mono text-xs leading-relaxed space-y-0.5">
              <div class="text-slate-500">// Java FileWriter example</div>
              <div><span class="text-purple-400">try</span> <span class="text-slate-300">(FileWriter fw = </span><span class="text-purple-400">new</span><span class="text-slate-300"> FileWriter(</span><span class="text-emerald-400">"{{ filename || 'notes.txt' }}"</span><span class="text-slate-300">)) &#123;</span></div>
              <div><span class="text-slate-300">  fw.write(</span><span class="text-emerald-400">"{{ (writeContent || 'Hello World').slice(0,30) }}{{ (writeContent || '').length > 30 ? '...' : '' }}"</span><span class="text-slate-300">);</span></div>
              <div><span class="text-slate-300">&#125;</span></div>
              <div class="text-slate-500">// try-with-resources auto-closes the file</div>
            </div>
          </div>
        }

        <!-- READ tab -->
        @if (currentTab === 'read') {
          <div class="space-y-4">
            <div>
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">File Name to Read</label>
              <input [(ngModel)]="filename" placeholder="e.g. notes.txt"
                class="w-full font-mono text-sm border-2 border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-400">
            </div>
            <button (click)="readFile()"
              class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
              <i class="fa-solid fa-folder-open"></i> Read File
            </button>
            <div class="bg-slate-900 rounded-xl p-4 font-mono text-xs leading-relaxed space-y-0.5">
              <div class="text-slate-500">// Java BufferedReader example</div>
              <div><span class="text-purple-400">try</span> <span class="text-slate-300">(BufferedReader br = </span><span class="text-purple-400">new</span><span class="text-slate-300"> BufferedReader(</span></div>
              <div><span class="text-slate-300">    </span><span class="text-purple-400">new</span><span class="text-slate-300"> FileReader(</span><span class="text-emerald-400">"{{ filename || 'notes.txt' }}"</span><span class="text-slate-300">))) &#123;</span></div>
              <div><span class="text-slate-300">  String line;</span></div>
              <div><span class="text-purple-400">  while</span><span class="text-slate-300"> ((line = br.readLine()) != </span><span class="text-blue-400">null</span><span class="text-slate-300">) &#123;</span></div>
              <div><span class="text-slate-300">    System.out.println(line);</span></div>
              <div><span class="text-slate-300">  &#125;</span></div>
              <div><span class="text-slate-300">&#125;</span></div>
            </div>
          </div>
        }

        <!-- APPEND tab -->
        @if (currentTab === 'append') {
          <div class="space-y-4">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">File Name</label>
                <input [(ngModel)]="filename" placeholder="e.g. notes.txt"
                  class="w-full font-mono text-sm border-2 border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-400">
              </div>
              <div>
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Content to Append</label>
                <textarea [(ngModel)]="appendContent" rows="3" placeholder="Text to add to end of file..."
                  class="w-full font-mono text-sm border-2 border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-400 resize-none"></textarea>
              </div>
            </div>
            <button (click)="appendFile()"
              class="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-xs font-black rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
              <i class="fa-solid fa-plus"></i> Append to File
            </button>
            <div class="bg-slate-900 rounded-xl p-4 font-mono text-xs leading-relaxed space-y-0.5">
              <div class="text-slate-500">// FileWriter with append=true</div>
              <div><span class="text-purple-400">try</span> <span class="text-slate-300">(FileWriter fw = </span><span class="text-purple-400">new</span><span class="text-slate-300"> FileWriter(</span><span class="text-emerald-400">"{{ filename || 'notes.txt' }}"</span><span class="text-slate-300">, </span><span class="text-blue-400">true</span><span class="text-slate-300">)) &#123;</span></div>
              <div><span class="text-slate-300">  fw.write(</span><span class="text-emerald-400">"{{ (appendContent || 'new line').slice(0, 25) }}"</span><span class="text-slate-300"> + </span><span class="text-emerald-400">"\\n"</span><span class="text-slate-300">);</span></div>
              <div><span class="text-slate-300">&#125;</span></div>
            </div>
          </div>
        }

        <!-- Simulated file system -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Simulated File System</p>
            @if (files.size > 0) {
              <button (click)="clearAll()" class="text-[10px] text-red-400 hover:text-red-600 font-semibold transition-all">Clear All</button>
            }
          </div>
          <div class="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden min-h-[80px]">
            @if (files.size === 0) {
              <div class="p-4 text-center text-xs text-slate-400 italic">No files yet — write to a file first</div>
            } @else {
              @for (entry of fileEntries; track entry.name) {
                <div class="flex items-start gap-3 p-3 border-b border-slate-100 last:border-0 hover:bg-slate-100 transition-all cursor-pointer"
                  (click)="previewFile(entry.name)">
                  <span class="text-lg">📄</span>
                  <div class="flex-1 min-w-0">
                    <div class="text-xs font-bold text-slate-700">{{ entry.name }}</div>
                    <div class="text-[10px] text-slate-400 font-mono truncate mt-0.5">{{ entry.preview }}</div>
                  </div>
                  <span class="text-[10px] text-slate-400">{{ entry.size }} bytes</span>
                </div>
              }
            }
          </div>
        </div>

        <!-- Log -->
        @if (log.length > 0) {
          <div class="bg-black rounded-xl p-3 font-mono text-xs space-y-1">
            @for (l of log; track $index) {
              <div [class.text-emerald-400]="l.ok" [class.text-red-400]="!l.ok">
                <i class="fa-solid fa-terminal text-slate-600 mr-1 text-[9px]"></i>{{ l.msg }}
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class FilesPlaygroundComponent {
  tabs = [
    { id: 'write' as Tab, label: 'Write', icon: '✏️' },
    { id: 'read'  as Tab, label: 'Read',  icon: '📖' },
    { id: 'append'as Tab, label: 'Append',icon: '➕' },
  ];
  currentTab: Tab = 'write';
  filename      = 'notes.txt';
  writeContent  = '';
  appendContent = '';
  files         = new Map<string, string>();
  log: { msg: string; ok: boolean }[] = [];

  get fileEntries() {
    return Array.from(this.files.entries()).map(([name, content]) => ({
      name,
      preview: content.slice(0, 60) + (content.length > 60 ? '...' : ''),
      size: new TextEncoder().encode(content).length,
    }));
  }

  writeFile() {
    const f = (this.filename || 'output.txt').trim();
    this.files.set(f, this.writeContent);
    this.push(`FileWriter: wrote ${this.writeContent.length} chars to "${f}"`, true);
  }

  readFile() {
    const f = (this.filename || 'output.txt').trim();
    if (this.files.has(f)) {
      const content = this.files.get(f)!;
      this.push(`BufferedReader: read "${f}" → ${content.slice(0, 50)}${content.length > 50 ? '...' : ''}`, true);
    } else {
      this.push(`FileNotFoundException: "${f}" not found. Write to it first.`, false);
    }
  }

  appendFile() {
    const f = (this.filename || 'output.txt').trim();
    const existing = this.files.get(f) ?? '';
    this.files.set(f, existing + (existing ? '\n' : '') + this.appendContent);
    this.push(`FileWriter(append): appended to "${f}"`, true);
  }

  previewFile(name: string) {
    const content = this.files.get(name)!;
    this.push(`Preview "${name}": ${content.slice(0, 80)}${content.length > 80 ? '...' : ''}`, true);
  }

  clearAll() { this.files.clear(); this.log = []; }

  private push(msg: string, ok: boolean) {
    this.log = [...this.log, { msg, ok }].slice(-6);
  }
}
