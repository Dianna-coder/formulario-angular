import { Cidade } from './../models/cidade';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BaseFormComponent } from '../base-form/base-form.component';
import { DropdownService } from '../services/dropdown.service';
import { ConsultaCepService } from '../services/consulta-cep.service';
import { VerificaEmailService } from '../services/verifica-email.service';
import { EstadoBr } from '../models/estado-br.model';
import { map, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { empty } from 'rxjs';
import { FormValidations } from '../services/form-validators';
import { EstadoNatalBr } from '../models/estado-natal-br.model';
import { CidadeNatal } from '../models/cidade-natal';
import { cpfValidator } from '../services/cpf.validators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent extends BaseFormComponent implements OnInit {

  public cpfMask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public celularMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public telresiMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public telcomeMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public rgMask = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];

  cpfPattern = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
  celularPattern = /^\(\d{2}\) \d{5}-\d{4}$/;
  telresiPattern = /^\(\d{2}\) \d{4}-\d{4}$/;
  telcomePattern = /^\(\d{2}\) \d{4}-\d{4}$/;
  rgPattern = /^\d{2}.\d{3}.\d{3}-\d{1}$/;

  estados: EstadoBr[];
  cidades: Cidade[];

  generos: any[];

  orgaos: any[];

  estadoCivils: any[];
  nacionalidades: any[];

  outros: EstadoNatalBr[];
  diferentes: CidadeNatal[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();
  }

  ngOnInit() {

    this.dropdownService.getEstadosBr()
      .subscribe(dados => this.estados = dados);

    this.generos = this.dropdownService.getGenero();

    this.orgaos = this.dropdownService.getOrgao();

    this.estadoCivils = this.dropdownService.getEstadoCivil();

    this.dropdownService.getEstadosNataisBr()
      .subscribe(dadosdois => this.outros = dadosdois);

    this.nacionalidades = this.dropdownService.getNacionalidades();



    this.formulario = this.formBuilder.group({

      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      dataNascimento: [null, [Validators.required]],
      genero: [],
      nacionalidade: [null, Validators.required],

      endereco: this.formBuilder.group({

        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      outro: [null, Validators.required],
      diferente: [null, Validators.required],
      cpf: [null, [Validators.required, Validators.pattern(this.cpfPattern), FormValidations.cpfValidacao]],
      rg: [null, [Validators.required, Validators.pattern(this.rgPattern)]],
      orgao: [null, Validators.required],
      dataExpedicao: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      nomeMae: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      nomePai: [null, [Validators.minLength(3), Validators.maxLength(100)]],

      email: [null, [Validators.required, Validators.email]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      celular: [null, [Validators.required, Validators.pattern(this.celularPattern)]],
      telResidencial: [null, [Validators.required, Validators.pattern(this.telresiPattern)]],
      telComercial: [null,  [Validators.required, Validators.pattern(this.telcomePattern)]],

      profissao: [null, Validators.required],
      renda: [null, Validators.required],
      americano: [null, Validators.required],
      agente: [null, Validators.required],
      servidor: [null, Validators.required]

    });

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP:', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('endereco.estado').valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
        tap(console.log)
      )
      .subscribe(cidades => this.cidades = cidades);

    this.formulario.get('outro').valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.outros.filter(e => e.sigla === estado)),
        map(outros => outros && outros.length > 0 ? outros[0].id : empty()),
        switchMap((estadoId: number) => this.dropdownService.getCidadesNatais(estadoId)),
        tap(console.log)
      )
      .subscribe(diferentes => this.diferentes = diferentes);
    this.dropdownService.getCidadesNatais(8).subscribe(console.log);

    // tslint:disable-next-line:max-line-length
    // Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
    // [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
  }

  submit() {
    this.http
      .post('https://httpbin.org/post', JSON.stringify({}))
      .subscribe(
        dados => {
          console.log(dados);
          // reseta o form
          // this.formulario.reset();
          // this.resetar();
        },
        (error: any) => alert('erro')
      );
  }
  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados) {
    // this.formulario.setValue({});

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }
  resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        cidade: null,
        estado: null
      }
    });
  }

  setarGenero() {
    const genero = { nome: 'f', desc: 'Feminino' };
    this.formulario.get('genero').setValue(genero);
  }

  setarOrgao() {
    const orgao = { nome: 'SSP', desc: 'Secretaria de Segurança Pública' };
    this.formulario.get('orgao').setValue(orgao);
  }

  setarEstadoCivil() {
    const estadoCivil = { desc: 'Solteiro(a)' };
    this.formulario.get('estadoCivil').setValue(estadoCivil);
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }

  setarNacionalidade() {
    const nacionalidade = {
      id: '38',
      pais: 'Portugal',
      nacionalidade: 'Português'
    };
    this.formulario.get('nacionalidade').setValue(nacionalidade);
  }
}

