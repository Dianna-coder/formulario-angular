import { AbstractControl } from '@angular/forms'

/**
 * Se o valor digitado não é um valor presente na lista, ele é inválidado
 * @param control AbstractControl
 */

export function only (...args: unknown[]) {
  return (control: AbstractControl): null | { only: true } => {
    if (!valueIs(control.value, args)) return { only: true }
    return null
  }
}

function valueIs (value: unknown, args: unknown[]): boolean {
  return args.some(arg => arg == value)
}