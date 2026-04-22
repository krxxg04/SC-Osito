# SC-Osito
Scientific Calculator Project.

> **Note:** This repository contains a web implementation (Angular/TypeScript) located inside the `sc-osito/` directory.

## Specifications (Requested Features)

### Logic / Evaluation
- Expression evaluation from text using **mathjs** (`evaluate`).
- Supports expressions with parentheses and operators (e.g., `(2+3)*4`, `2^3`, `5!`).
- Internal Variables:
  - `Ans`: Stores the last numerical result.
  - `M`: Stores the memory value.

### Modes
- **DRG (RAD/DEG)**: This mode affects `sin/cos/tan` and their inverses `asin/acos/atan`.
- **SHIFT**: Enables secondary functions (inverse trigonometric and hyperbolic functions).

### Supported Operations
- **Basic**: `+`, `-`, `*`, `/`, `(`, `)`, `.`
- **Scientific**:
  - Trigonometry: `sin`, `cos`, `tan` + inverses via SHIFT.
  - Hyperbolics: `sinh`, `cosh`, `tanh` + inverses via SHIFT.
  - Logarithms: `ln` (`log`) and `log` base 10 (`log10`).
  - Powers and Roots: `x^y`, `x²`, `x³`, `sqrt`.
  - Others: `abs`, `1/x`, `x!`, constants `PI` and `e`.
  - Percentage: `%` (interpreted as `*0.01`).
  - Scientific Notation: `EXP` (for `1e3`, `2.5e-4`, etc.).

### Memory
- `MC`, `MR`, `M+`, `M-`, and variable `M`.

### UI Technology
- Standalone component using **Signals**.
- Keyboard layout built with **CSS Grid** (responsive) featuring additional scientific buttons.

---

# Scientific Calculator Guide

This calculator allows you to write **complete expressions** (like a modern scientific calculator) and evaluate them using `mathjs`.

## How to use it

1.  **Build your expression** by tapping the buttons (e.g., `sin(` `45` `)` `+` `sqrt(` `16` `)`).
2.  Press **`=`** to calculate.
3.  **`AC`** clears everything (expression, result, and error).
4.  **`DEL`** deletes the last character.

### Input Type: "Expression"
- Use parentheses for grouping: `(2+3)*4`.
- Powers use `^`: `2^3`.
- Factorials use `!`: `5!`.
- Scientific notation with `EXP`: `1e3` (equals 1000).

## Modes

### DRG: RAD / DEG
- Toggles whether `sin/cos/tan` work in **Radians** (`RAD`) or **Degrees** (`DEG`).
- Also affects inverse functions: `asin/acos/atan`.

### SHIFT
- Activates secondary functions on specific buttons.
- With SHIFT **ON**:
  - `sin` → `asin`
  - `cos` → `acos`
  - `tan` → `atan`
  - `sinh` → `asinh`
  - `cosh` → `acosh`
  - `tanh` → `atanh`

## Memory and Variables

- `Ans`: Inserts the **last numerical result**.
- `M`: Inserts the current **memory** value into the expression.
- `MC`: Sets memory to 0.
- `MR`: Inserts the memory value into the expression.
- `M+`: Adds the numerical value of the current expression to memory (if evaluable).
- `M-`: Subtracts the numerical value of the current expression from memory (if evaluable).

## Button Functions

> **Note:** Some buttons insert function-type text (e.g., `sqrt(`). In these cases, you must usually close the expression with `)`.

### Control
- `AC`: Clear all.
- `DEL`: Delete last character.
- `SHIFT`: Toggle secondary functions.
- `DRG: RAD/DEG`: Toggle angle mode.
- `=`: Evaluate expression.

### Basic
- `0–9`: Digits.
- `.`: Decimal point.
- `+  −  ×  ÷`: Basic operations.
- `( )`: Parentheses.
- `+/-`: Changes the sign of the last term (wraps it as `-(...)`).
- `%`: Converts to percentage by multiplying by `0.01` (useful for expressions like `200*10%`).

### Scientific
- `sin(`, `cos(`, `tan(`: Trigonometry (depends on DRG mode).
- `asin(`, `acos(`, `atan(`: Inverse trigonometry (via SHIFT).
- `sinh(`, `cosh(`, `tanh(`: Hyperbolic functions.
- `asinh(`, `acosh(`, `atanh(`: Inverse hyperbolic functions (via SHIFT).
- `log(`: Natural logarithm (ln).
- `log10(`: Base-10 logarithm.
- `sqrt(`: Square root.
- `abs(`: Absolute value.
- `x^y` (`^`): Power/Exponent.
- `x²`: Square (raises last term to the power of 2).
- `x³`: Cube (raises last term to the power of 3).
- `1/x`: Reciprocal (transforms last term to `1/(term)`).
- `x!` (`!`): Factorial of the last term.
- `PI`: Constant π.
- `e`: Euler’s constant.
- `10^x`: Inserts `10^(`.
- `e^x`: Inserts `e^(`.
- `EXP`: Scientific notation (inserts `e` to use `1e3`, `2.5e-4`, etc.).

## Examples
- `sin(90)` in `DEG` mode → 1
- `sin(PI/2)` in `RAD` mode → 1
- `5!` → 120
- `1/(2+3)` → 0.2
- `200*10%` → 20
- `1e3 + 5` → 1005
