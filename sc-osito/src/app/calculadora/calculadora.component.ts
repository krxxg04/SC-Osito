import { Component, computed, signal } from '@angular/core';
import { evaluate } from 'mathjs';

type EvalScope = Record<string, unknown>;
type AngleMode = 'RAD' | 'DEG';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {
  readonly expression = signal('');
  readonly result = signal('0');
  readonly error = signal<string | null>(null);
  readonly angleMode = signal<AngleMode>('RAD');
  readonly ans = signal<number>(0);

  readonly displayExpression = computed(() => {
    const expr = this.expression();
    if (!expr) return '0';
    return expr.replaceAll('*', '×').replaceAll('/', '÷');
  });

  private readonly scope: EvalScope = {
    PI: Math.PI,
    e: Math.E,
    Ans: () => this.ans(),
    // Trigonometría en grados (sin(45) => 0.7071...).
    sin: (x: unknown) => Math.sin(this.toRadians(this.toNumber(x))),
    cos: (x: unknown) => Math.cos(this.toRadians(this.toNumber(x))),
    tan: (x: unknown) => Math.tan(this.toRadians(this.toNumber(x)))
  };

  append(token: string): void {
    this.error.set(null);
    this.expression.set(this.expression() + token);
  }

  toggleAngleMode(): void {
    this.angleMode.set(this.angleMode() === 'RAD' ? 'DEG' : 'RAD');
  }

  appendPercent(): void {
    this.error.set(null);
    const expr = this.expression();
    const trimmed = expr.trimEnd();
    if (!trimmed) {
      this.expression.set('0.01');
      return;
    }

    const last = trimmed[trimmed.length - 1];
    if (this.isAtomEnd(last)) {
      this.expression.set(expr + '*0.01');
      return;
    }

    this.expression.set(expr + '0.01');
  }

  applyInverse(): void {
    this.wrapLastAtom((atom) => `1/(${atom})`);
  }

  applySquare(): void {
    this.applyPostfix('^2');
  }

  applyCube(): void {
    this.applyPostfix('^3');
  }

  applyFactorial(): void {
    this.applyPostfix('!');
  }

  clearAll(): void {
    this.expression.set('');
    this.result.set('0');
    this.error.set(null);
  }

  del(): void {
    const expr = this.expression();
    if (!expr) return;
    this.error.set(null);
    this.expression.set(expr.slice(0, -1));
  }

  calculate(): void {
    const expr = this.expression().trim();
    if (!expr) return;

    try {
      const value = evaluate(expr, this.scope);
      const formatted = this.formatResult(value);
      const numeric = this.tryToNumber(value);
      if (numeric !== null) this.ans.set(numeric);
      this.result.set(formatted);
      this.expression.set(formatted);
      this.error.set(null);
    } catch {
      this.error.set('Expresión inválida');
    }
  }

  private toNumber(value: unknown): number {
    if (typeof value === 'number') return value;
    const asNumber = Number(value);
    if (Number.isFinite(asNumber)) return asNumber;
    throw new Error('Número inválido');
  }

  private tryToNumber(value: unknown): number | null {
    try {
      return this.toNumber(value);
    } catch {
      return null;
    }
  }

  private toRadians(value: number): number {
    if (this.angleMode() === 'RAD') return value;
    return value * (Math.PI / 180);
  }

  private applyPostfix(postfix: string): void {
    this.error.set(null);
    this.wrapLastAtom((atom) => `${atom}${postfix}`);
  }

  private wrapLastAtom(transform: (atom: string) => string): void {
    this.error.set(null);

    const expr = this.expression();
    const trimmedEnd = expr.trimEnd();
    if (!trimmedEnd) return;

    const endIndex = trimmedEnd.length;
    const startIndex = this.findLastAtomStart(trimmedEnd);
    if (startIndex === null) return;

    const atom = trimmedEnd.slice(startIndex, endIndex);
    const before = trimmedEnd.slice(0, startIndex);
    const updated = before + transform(atom);
    this.expression.set(updated);
  }

  private findLastAtomStart(expr: string): number | null {
    let i = expr.length - 1;

    while (i >= 0 && expr[i] === ' ') i--;
    if (i < 0) return null;

    // Soportar factorial postfix.
    if (expr[i] === '!') i--;
    if (i < 0) return 0;

    if (expr[i] === ')') {
      let depth = 0;
      for (let j = i; j >= 0; j--) {
        const ch = expr[j];
        if (ch === ')') depth++;
        else if (ch === '(') {
          depth--;
          if (depth === 0) return j;
        }
      }
      return 0;
    }

    // Números y constantes/identificadores (PI, Ans, e, etc.).
    for (let j = i; j >= 0; j--) {
      const ch = expr[j];
      if (!this.isAtomChar(ch)) return j + 1;
    }
    return 0;
  }

  private isAtomChar(ch: string): boolean {
    return /[0-9A-Za-z_.]/.test(ch);
  }

  private isAtomEnd(ch: string): boolean {
    return /[0-9)A-Za-z_.!]/.test(ch);
  }

  private formatResult(value: unknown): string {
    if (typeof value === 'number') {
      if (Number.isFinite(value)) return String(value);
      return 'Error';
    }
    return String(value);
  }
}
