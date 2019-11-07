import { AbstractControl } from '@angular/forms'

/**
 * Se data for maior que a data de hoje, campo é invalidado
 * @param control AbstractControl
 */
export function maxHojeValidator (control: AbstractControl): null | { maxHojeValidator: true } {

  if (dataFutura(control.value)) return { maxHojeValidator: true }

  return null
}

export function minHojeValidator (control: AbstractControl): null | { minHojeValidator: true } {

  if (!dataFutura(control.value)) return { minHojeValidator: true }

  return null
}

function dataFutura (data: string): boolean { return new Date(data).getTime() > Date.now() }