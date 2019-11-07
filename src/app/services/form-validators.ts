import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {
  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      /* const values = formArray.controls;
      let totalChecked = 0;
      for (let i = 0; i < values.length; i++) {
        if (values[i].value) {
          totalChecked += 1;
        }
      } */
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {

    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  // static mascaraCpfCnpj(control: FormControl) {
  //   const cpfCnpj = control.value;
  //   if (cpfCnpj && cpfCnpj !== '' && cpfCnpj < /^[0-9]{12}$/) {
  //     const cpf = cpfCnpj;
  //     const validacpf = /^[0-9]{11}$/;
  //     return validacpf.test(cpf) ? null : { cpfInvalido: true };
  //   }
  //   if (cpfCnpj && cpfCnpj !== '' && cpfCnpj < /^[0-9]{15}$/) {
  //     const cnpj = cpfCnpj;
  //     const validacnpj = /^[0-9]{14}$/;
  //     return validacnpj.test(cnpj) ? null : { cnpjInvalido: true };
  //   } else {
  //     return null;
  //   }
  // }

  // static mascaraCnpj(control: FormControl) {
  //   const cnpj = control.value;
  //   if (cnpj && cnpj !== '') {
  //     const validacnpj = /^[0-9]{14}$/;
  //     return validacnpj.test(cnpj) ? null : { cnpjInvalido: true };
  //   }
  //   return null;
  // }

  // static mascaraRg(control: FormControl) {
  //   const rg = control.value;
  //   if (rg && rg !== '') {
  //     const validarg = /^[0-9]{9}$/;
  //     return validarg.test(rg) ? null : { rgInvalido: true };
  //   }
  //   return null;
  // }
    static cpfValidacao(control: FormControl): boolean {
    const cpf: string = control.value;
    if (cpf == null) {
      return false;
    }
    if (cpf.length !== 11) {
      return false;
    }

    if ((cpf === '00000000000')
      || (cpf === '11111111111')
      || (cpf === '22222222222')
      || (cpf === '33333333333')
      || (cpf === '44444444444')
      || (cpf === '55555555555')
      || (cpf === '66666666666')
      || (cpf === '77777777777')
      || (cpf === '88888888888')
      || (cpf === '99999999999')) {
      return false;
    }
    let numero = 0;
    let caracter = '';
    const numeros = '0123456789';
    let j = 10;
    let somatorio = 0;
    let resto = 0;
    let digito1 = 0;
    let digito2 = 0;
    let cpfAux = '';
    cpfAux = cpf.substring(0, 9);
    for (let i = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) === -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf !== cpfAux) {
      return false;
    }
    return null;
  }



  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }

      return null;
    };
    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      'required': `${fieldName} é obrigatório.`,
      'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      'cepInvalido': 'CEP inválido.',
      'emailInvalido': 'Email já cadastrado!',
      'equalsTo': 'Campos não são iguais',
      'pattern': 'Campo inválido'
    };

    return config[validatorName];
  }
}
