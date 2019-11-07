import { AbstractControl } from '@angular/forms'

export function acimaDezoitoAnosValidator (control: AbstractControl): null | { acimaDezoitoAnos: true } {

  if (!acimaDezoitoAnos(control.value)) return { acimaDezoitoAnos: true }

  return null
}

/**
 * Retornar se data de nascimento recebida corresponde a de alguém maior de idade
 * @param dataNasc Date
 * @returns boolean
 */
export function acimaDezoitoAnos (dataNasc?: Date | string): boolean {
  if (!dataNasc) return false
  const hoje = new Date()
  const data18 = hoje.setFullYear(hoje.getFullYear() - 18)
  return typeof dataNasc !== 'string' 
    ? dataNasc.getTime() <= data18 
    : new Date(dataNasc).getTime() <= data18
}