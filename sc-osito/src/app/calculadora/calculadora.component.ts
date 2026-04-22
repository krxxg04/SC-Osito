import { Component, computed, signal } from '@angular/core';
import { evaluate } from 'mathjs';

type EvalScope = Record<string, unknown>;

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

  readonly displayExpression = computed(() => {
    const expr = this.expression();
    if (!expr) return '0';
    return expr.replaceAll('*', '×').replaceAll('/', '÷');
  });

  private readonly scope: EvalScope = {
    PI: Math.PI,
    // Trigonometría en grados (sin(45) => 0.7071...).
    sin: (x: unknown) => Math.sin(this.toNumber(x) * (Math.PI / 180)),
    cos: (x: unknown) => Math.cos(this.toNumber(x) * (Math.PI / 180)),
    tan: (x: unknown) => Math.tan(this.toNumber(x) * (Math.PI / 180))
  };

  append(token: string): void {
    this.error.set(null);
    this.expression.set(this.expression() + token);
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

  private formatResult(value: unknown): string {
    if (typeof value === 'number') {
      if (Number.isFinite(value)) return String(value);
      return 'Error';
    }
    return String(value);
  }
}
