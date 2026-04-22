# SC-Osito
First version of a scientific calculator made in C++.

# Guía de la Calculadora Científica

Esta calculadora permite escribir **expresiones completas** (como en una calculadora científica moderna) y evaluarlas con `mathjs`.

## Cómo usarla

1. **Construye la expresión** tocando los botones (por ejemplo: `sin(` `45` `)` `+` `sqrt(` `16` `)`).
2. Presiona **`=`** para calcular.
3. **`AC`** borra todo (expresión, resultado y error).
4. **`DEL`** borra el último carácter.

### Entrada tipo “expresión”
- Puedes escribir con paréntesis: `(2+3)*4`.
- Potencias con `^`: `2^3`.
- Factorial con `!`: `5!`.
- Notación científica con `EXP`: `1e3` (1000).

## Modos

### DRG: RAD / DEG
- Controla si `sin/cos/tan` trabajan en **radianes** (`RAD`) o **grados** (`DEG`).
- Afecta también a las inversas: `asin/acos/atan`.

### SHIFT
- Activa funciones secundarias en algunos botones.
- Con SHIFT **ON**:
  - `sin` → `asin`
  - `cos` → `acos`
  - `tan` → `atan`
  - `sinh` → `asinh`
  - `cosh` → `acosh`
  - `tanh` → `atanh`

## Memoria y variables

- `Ans`: inserta el **último resultado** numérico.
- `M`: inserta el valor actual de **memoria** en la expresión.
- `MC`: pone la memoria en 0.
- `MR`: inserta el valor de memoria en la expresión.
- `M+`: suma a memoria el valor numérico de la expresión actual (si se puede evaluar).
- `M-`: resta a memoria el valor numérico de la expresión actual (si se puede evaluar).

## Qué hace cada botón

> Nota: Algunos botones insertan texto tipo función (por ejemplo `sqrt(`). En esos casos normalmente debes cerrar con `)`.

### Control
- `AC`: limpiar todo.
- `DEL`: borrar último carácter.
- `SHIFT`: alternar funciones secundarias.
- `DRG: RAD/DEG`: alternar modo de ángulo.
- `=`: evaluar la expresión.

### Básicos
- `0–9`: dígitos.
- `.`: decimal.
- `+  −  ×  ÷`: operaciones.
- `( )`: paréntesis.
- `+/-`: cambia el signo del último término (lo envuelve como `-(...)`).
- `%`: convierte a porcentaje multiplicando por `0.01` (útil en expresiones como `200*10%`).

### Científicos
- `sin(`, `cos(`, `tan(`: trigonometría (según DRG).
- `asin(`, `acos(`, `atan(`: inversas trigonométricas (SHIFT).
- `sinh(`, `cosh(`, `tanh(`: hiperbólicas.
- `asinh(`, `acosh(`, `atanh(`: inversas hiperbólicas (SHIFT).
- `log(`: logaritmo natural (ln).
- `log10(`: logaritmo base 10.
- `sqrt(`: raíz cuadrada.
- `abs(`: valor absoluto.
- `x^y` (`^`): potencia.
- `x²`: eleva el último término a 2.
- `x³`: eleva el último término a 3.
- `1/x`: transforma el último término a `1/(término)`.
- `x!` (`!`): factorial del último término.
- `PI`: constante π.
- `e`: constante Euler.
- `10^x`: inserta `10^(`.
- `e^x`: inserta `e^(`.
- `EXP`: notación científica (inserta `e` para usar `1e3`, `2.5e-4`, etc.).

## Ejemplos
- `sin(90)` en modo `DEG` → 1
- `sin(PI/2)` en modo `RAD` → 1
- `5!` → 120
- `1/(2+3)` → 0.2
- `200*10%` → 20
- `1e3 + 5` → 1005
