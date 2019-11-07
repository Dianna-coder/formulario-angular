import { AbstractControl } from '@angular/forms';

export function cpfValidator(control: AbstractControl): null | { cpf: true } {

  if (!CPFValido(control.value)) { return { cpf: true }; }

  return null;
}

function CPFValido(cpfParaValidar: string): boolean {
  const cpfFiltrado = cpfParaValidar.replace(/[^\d]+/g, '');
  if (!cpfFiltrado || cpfFiltrado.length !== 11) { return false; }
  const cpfsInvalidos: string[] = [
    '',
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ];

  if (cpfsInvalidos.includes(cpfFiltrado)) { return false; }

  const digitosExtras = [0, 1];

  for (const digitoExtra of digitosExtras) {
    if (!calculoCPFValido(cpfFiltrado, digitoExtra)) { return false; }
  }

  return true;
}

function calculoCPFValido(cpfFiltrado: string, digitoExtra: number): boolean {
  const cpf = cpfFiltrado.substring(0, (9 + digitoExtra));
  let res = 0;

  cpf
    .split('')
    .map((val) => parseInt(val, 10))
    .forEach((val, index) => {
      res += val * ((10 + digitoExtra) - index);
    });

  const resto = 11 - (res % 11);
  const revisao = resto === 10 || resto === 11 ? 0 : resto;

  return !(revisao !== parseInt(cpfFiltrado[9 + digitoExtra], 10));
}
