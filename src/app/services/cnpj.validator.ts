import { AbstractControl } from '@angular/forms';

export function cnpjValidator(control: AbstractControl): null | { cnpj: true } {

  if (!CNPJValido(control.value)) { return { cnpj: true }; }

  return null;
}

function CNPJValido(cnpjParaValidar: string): boolean {
  if (!cnpjParaValidar) { return false; }
  const cnpj = cnpjParaValidar.replace(/[^\d]+/g, '');

  // Valida a quantidade de caracteres
  if (cnpj.length !== 14) { return false; }

  // Elimina inválidos com todos os caracteres iguais
  if (/^(\d)\1+$/.test(cnpj)) { return false; }

  // Cáculo de validação
  const t = cnpj.length - 2;
  const d = cnpj.substring(t);
  const d1 = parseInt(d.charAt(0), 10);
  const d2 = parseInt(d.charAt(1), 10);

  return calcularCNPJ(t, cnpj) === d1 && calcularCNPJ(t + 1, cnpj) === d2;
}

function calcularCNPJ(x: number, cnpj: string): number {
  const n = cnpj.substring(0, x);
  let y = x - 7;
  let s: any = 0;
  let r = 0;

  for (let i = x; i >= 1; i--) {
    s += (parseInt(n.charAt(x - i), 10)) * y--;
    if (y < 2) { y = 9; }
  }

  r = 11 - s % 11;
  return r > 9 ? 0 : r;
}
