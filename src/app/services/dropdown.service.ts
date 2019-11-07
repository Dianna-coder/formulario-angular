import { Nacionalidade } from './../models/nacionalidade';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from './../models/estado-br.model';
import { Cidade } from '../models/cidade';
import { EstadoNatalBr } from '../models/estado-natal-br.model';
import { CidadeNatal } from '../models/cidade-natal';

@Injectable()
export class DropdownService {
  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
      .pipe(
        // tslint:disable-next-line:triple-equals
        map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
      );
  }

  getEstadosNataisBr() {
    return this.http.get<EstadoNatalBr[]>('assets/dados/estadosnataisbr.json');
  }

  getCidadesNatais(idEstado: number) {
    return this.http.get<CidadeNatal[]>('assets/dados/cidadesnatais.json')
      .pipe(
        // tslint:disable-next-line:triple-equals
        map((diferentes: CidadeNatal[]) => diferentes.filter(c => c.estado == idEstado))
      );
  }

  getNacionalidades() {
    return [
      {
        id: '1',
        pais: 'Afeganistão',
        nome: 'Afegão'
      },
      {
        id: '2',
        pais: 'África',
        nome: 'Africano'
      },
      {
        id: '3',
        pais: 'Alemanha',
        nome: 'Alemão'
      }, {
        id: '4',
        pais: 'Estados Unidos',
        nome: 'Americano'
      }, {
        id: '5',
        pais: 'Argentina',
        nome: 'Argentino'
      }, {
        id: '6',
        pais: 'Arábia Saudita',
        nome: 'Árabe'
      }, {
        id: '7',
        pais: 'Austrália',
        nome: 'Australiano'
      }, {
        id: '8',
        pais: 'Austría',
        nome: 'Austríaco'
      }, {
        id: '9',
        pais: 'Bélgica',
        nome: 'Belga'
      }, {
        id: '10',
        pais: 'Brasil',
        nome: 'Brasileiro'
      }, {
        id: '11',
        pais: 'Reino Unido',
        nome: 'Britânico'
      }, {
        id: '12',
        pais: 'Canadá',
        nome: 'Canadense'
      }, {
        id: '13',
        pais: 'Chile',
        nome: 'Chileno'
      }, {
        id: '14',
        pais: 'China',
        nome: 'Chinês'
      }, {
        id: '15',
        pais: 'Colômbia',
        nome: 'Colombiano'
      }, {
        id: '16',
        pais: 'Coreia do Sul',
        nome: 'Sul-coreano'
      }, {
        id: '17',
        pais: 'Croácia',
        nome: 'Croata'
      }, {
        id: '18',
        pais: 'Dinamarca',
        nome: 'Dinamarquês'
      }, {
        id: '19',
        pais: 'Egito',
        nome: 'Egípcio'
      }, {
        id: '20',
        pais: 'Escócia',
        nome: 'Escocês'
      }, {
        id: '21',
        pais: 'Eslováquia',
        nome: 'Eslovaco'
      }, {
        id: '22',
        pais: 'Espanha',
        nome: 'Espanhol'
      }, {
        id: '23',
        pais: 'Filipinas',
        nome: 'Filipino'
      }, {
        id: '24',
        pais: 'Finlândia',
        nome: 'Finlandês'
      }, {
        id: '25',
        pais: 'França',
        nome: 'Francês'
      }, {
        id: '26',
        pais: 'Grécia',
        nome: 'Grego'
      }, {
        id: '27',
        pais: 'Holanda',
        nome: 'Holandês'
      }, {
        id: '28',
        pais: 'Índia',
        nome: 'Indiano'
      }, {
        id: '29',
        pais: 'Inglaterra',
        nome: 'Inglês'
      }, {
        id: '30',
        pais: 'Irão',
        nome: 'Iraniano'
      }, {
        id: '31',
        pais: 'Iraque',
        nome: 'Iraquiano'
      }, {
        id: '32',
        pais: 'Itália',
        nome: 'Italiano'
      }, {
        id: '33',
        pais: 'Japão',
        nome: 'Japonês'
      }, {
        id: '34',
        pais: 'México',
        nome: 'Mexicano'
      }, {
        id: '35',
        pais: 'Noruega',
        nome: 'Norueguês'
      }, {
        id: '36',
        pais: 'Paquistão',
        nome: 'Paquistanês'
      }, {
        id: '37',
        pais: 'Polônia',
        nome: 'Polonês'
      }, {
        id: '38',
        pais: 'Portugal',
        nome: 'Português'
      }, {
        id: '39',
        pais: 'Rússia',
        nome: 'Russo'
      }, {
        id: '40',
        pais: 'Suécia',
        nome: 'Sueco'
      }, {
        id: '41',
        pais: 'África do Sul',
        nome: 'Sul-Africano'
      }, {
        id: '42',
        pais: 'Turquia',
        nome: 'Turco'
      }
    ];
  }

  // getNacionalidade() {
  //   return [
  //     { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
  //     { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
  //     { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
  //   ];
  // }

  getGenero() {
    return [
      { nome: 'f', desc: 'Feminino' },
      { nome: 'm', desc: 'Masculino' }
    ];
  }

  getOrgao() {
    return [
      { nome: 'SSP', desc: 'Secretaria de Segurança Pública' },
      { nome: 'PM', desc: 'Polícia Militar' },
      { nome: 'PC', desc: 'Policia Civil' },
      { nome: 'CNT', desc: 'Carteira Nacional de Habilitação' },
      { nome: 'DIC', desc: 'Diretoria de Identificação Civil' },
      { nome: 'CTPS', desc: 'Carteira de Trabaho e Previdência Social' },
      { nome: 'FGTS', desc: 'Fundo de Garantia do Tempo de Serviço' },
      { nome: 'IFP', desc: 'Instituto Félix Pacheco' },
      { nome: 'IPF', desc: 'Instituto Pereira Faustino' },
      { nome: 'IML', desc: 'Instituto Médico-Legal' },
      { nome: 'MTE', desc: 'Ministério do Trabalho e Emprego' },
      { nome: 'MMA', desc: 'Ministério da Marinha' },
      { nome: 'MAE', desc: 'Ministério da Aeronáutica' },
      { nome: 'MEX', desc: 'Ministério do Exército' },
      { nome: 'POF', desc: 'Polícia Federal' },
      { nome: 'POM', desc: 'Polícia Militar' },
      { nome: 'SES', desc: 'Carteira de Estrangeiro' },
      { nome: 'SJS', desc: 'Secretaria da Justiça e Segurança' },
      { nome: 'SJTS', desc: 'Secretaria da Justiça do Trabalho e Segurança' },
      { nome: 'ZZZ', desc: 'Outros (inclusive exterior)' }
    ];
  }

  getEstadoCivil() {
    return [
      { desc: 'Solteiro(a)' },
      { desc: 'Casado(a)' },
      { desc: 'Divorciado(a)' }
    ];
  }
}
