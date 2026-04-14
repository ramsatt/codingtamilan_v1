import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encapsulation-playground',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xl my-6">

      <div class="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
        <span class="text-xs font-black text-slate-900 uppercase tracking-widest">Encapsulation — BankAccount</span>
      </div>

      <div class="p-6 grid lg:grid-cols-2 gap-6">

        <!-- Left: Object panel -->
        <div class="space-y-4">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Object State</p>

          <!-- Object card -->
          <div class="rounded-xl border-2 border-slate-700 bg-slate-900 p-5 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <i class="fa-solid fa-building-columns text-white text-sm"></i>
              </div>
              <div>
                <div class="font-mono text-xs text-slate-400">BankAccount</div>
                <div class="font-mono text-sm font-bold text-white">myAccount</div>
              </div>
            </div>

            <!-- Private field -->
            <div class="bg-red-950/50 border border-red-800 rounded-lg p-3">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[9px] bg-red-800 text-red-200 px-2 py-0.5 rounded-full font-bold uppercase">private</span>
                <span class="font-mono text-xs text-slate-400">double balance</span>
              </div>
              <div class="font-mono text-2xl font-black text-emerald-400">₹ {{ balance.toFixed(2) }}</div>
              <p class="text-[10px] text-red-400 mt-1">Cannot be accessed directly from outside this class</p>
            </div>

            <!-- Owner field (public) -->
            <div class="bg-emerald-950/30 border border-emerald-800/50 rounded-lg p-3">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[9px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase">private</span>
                <span class="font-mono text-xs text-slate-400">String owner</span>
              </div>
              <div class="font-mono text-sm font-bold text-white">{{ owner }}</div>
            </div>
          </div>

          <!-- Operations -->
          <div class="space-y-3">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Public Methods (API)</p>

            <div class="flex gap-2">
              <input type="number" [(ngModel)]="amount" min="1"
                class="flex-1 border border-slate-300 rounded-lg px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-brand-300 focus:border-brand-500 outline-none"
                placeholder="Amount">
              <button (click)="deposit()"
                class="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-lg transition-all active:scale-95">
                deposit()
              </button>
              <button (click)="withdraw()"
                class="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-xs font-black rounded-lg transition-all active:scale-95">
                withdraw()
              </button>
            </div>

            <button (click)="getBalance()"
              class="w-full py-2 border-2 border-brand-300 text-brand-600 text-xs font-black rounded-lg hover:bg-brand-50 transition-all">
              getBalance() — read the private field
            </button>
          </div>

          <!-- Log -->
          <div class="bg-black rounded-xl border border-slate-800 p-4 font-mono text-xs space-y-1 min-h-[80px] overflow-y-auto max-h-[140px]">
            @if (log.length === 0) {
              <span class="text-slate-600 italic">Console output will appear here...</span>
            }
            @for (entry of log; track $index) {
              <div [class.text-emerald-400]="entry.type === 'success'"
                [class.text-red-400]="entry.type === 'error'"
                [class.text-blue-400]="entry.type === 'info'">
                <i class="fa-solid fa-terminal text-slate-600 mr-1.5"></i>{{ entry.msg }}
              </div>
            }
          </div>
        </div>

        <!-- Right: Code panel -->
        <div class="space-y-4">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Java Code</p>

          <div class="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs leading-relaxed space-y-0.5 overflow-x-auto">
            <div><span class="text-purple-400">public class</span> <span class="text-yellow-300">BankAccount</span> &#123;</div>
            <div class="pl-4">
              <span class="text-red-400">private double</span> <span class="text-white">balance</span>;
              <span class="text-slate-500"> // hidden!</span>
            </div>
            <div class="pl-4"><span class="text-red-400">private</span> <span class="text-blue-400">String</span> <span class="text-white">owner</span>;</div>
            <div class="h-2"></div>
            <div class="pl-4"><span class="text-slate-500">// constructor</span></div>
            <div class="pl-4">
              <span class="text-yellow-300">BankAccount</span>(<span class="text-blue-400">String</span> <span class="text-white">owner</span>) &#123;
            </div>
            <div class="pl-8"><span class="text-purple-300">this</span>.owner = owner; <span class="text-purple-300">this</span>.balance = <span class="text-emerald-400">0</span>;</div>
            <div class="pl-4">&#125;</div>
            <div class="h-2"></div>
            <div class="pl-4">
              <span class="text-purple-400">public void</span> <span class="text-yellow-300">deposit</span>(<span class="text-blue-400">double</span> <span class="text-white">amount</span>) &#123;
            </div>
            <div class="pl-8">
              <span class="text-purple-400">if</span> (amount &gt; <span class="text-emerald-400">0</span>) balance += amount;
            </div>
            <div class="pl-4">&#125;</div>
            <div class="h-2"></div>
            <div class="pl-4">
              <span class="text-purple-400">public void</span> <span class="text-yellow-300">withdraw</span>(<span class="text-blue-400">double</span> <span class="text-white">amount</span>) &#123;
            </div>
            <div class="pl-8">
              <span class="text-purple-400">if</span> (amount &lt;= balance) balance -= amount;
            </div>
            <div class="pl-4">&#125;</div>
            <div class="h-2"></div>
            <div class="pl-4">
              <span class="text-purple-400">public double</span> <span class="text-yellow-300">getBalance</span>() &#123;
            </div>
            <div class="pl-8"><span class="text-purple-400">return</span> balance;</div>
            <div class="pl-4">&#125;</div>
            <div>&#125;</div>
          </div>

          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 leading-relaxed">
            <strong>Why encapsulation?</strong> The <code class="bg-amber-100 px-1 rounded">balance</code> field is
            <code class="bg-amber-100 px-1 rounded">private</code> — you can't set it to a negative value directly.
            Only the <code class="bg-amber-100 px-1 rounded">deposit()</code> and
            <code class="bg-amber-100 px-1 rounded">withdraw()</code> methods (which validate the amount) can modify it.
            This is <strong>data protection</strong> — the key benefit of encapsulation.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class EncapsulationPlaygroundComponent {
  balance  = 1000;
  owner    = 'Arun Kumar';
  amount   = 200;
  log: { msg: string; type: 'success' | 'error' | 'info' }[] = [];

  deposit() {
    const amt = +this.amount;
    if (amt <= 0) { this.push(`deposit(${amt}): Amount must be positive`, 'error'); return; }
    this.balance += amt;
    this.push(`deposit(${amt}) → Balance: ₹${this.balance.toFixed(2)}`, 'success');
  }

  withdraw() {
    const amt = +this.amount;
    if (amt <= 0) { this.push(`withdraw(${amt}): Amount must be positive`, 'error'); return; }
    if (amt > this.balance) { this.push(`withdraw(${amt}): Insufficient funds!`, 'error'); return; }
    this.balance -= amt;
    this.push(`withdraw(${amt}) → Balance: ₹${this.balance.toFixed(2)}`, 'success');
  }

  getBalance() {
    this.push(`getBalance() → ₹${this.balance.toFixed(2)}`, 'info');
  }

  private push(msg: string, type: 'success' | 'error' | 'info') {
    this.log = [{ msg, type }, ...this.log].slice(0, 10);
  }
}
