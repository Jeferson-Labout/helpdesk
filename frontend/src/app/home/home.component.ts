import { Component, OnInit } from '@angular/core';
import { Chamado } from '../models/chamado';
import { ChamadoService } from '../services/chamado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  chamados: Chamado[] = []

  totalChamados: number;
  abertoChamados: number ;
  andamentoChamados: number ;
  fechadoChamados: number;
  
  porcentagenstotalChamados: number;
  porcentagensAbertos:number;
  porcentagensAndamento:number;
  porcentagensFechados:number;



  constructor( private service: ChamadoService) {this.ngOnInit() }


  ngOnInit(): void {

    this.findTop5();
    this.findCount();
    this.findAberto();
    this.findAndamento();
    this.findFechado();
  }

  
  retornaStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA'
    } else if (prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }

  orderByStatus(status: any): void {

    if (status == '0') {
     status = 'ABERTO'
    } else if (status == '1') {
      status = 'ANDAMENTO'
    } else if (status == '2') {
      status = 'ENCERRADO'
    }

  }


    
  findTop5(): void {
    this.service.findTop5().subscribe(resposta => {
      this.chamados = resposta;
    
    })
  }
    
  findCount(): void {
    this.service.findCount().subscribe(resposta => {
      this.totalChamados = resposta;     
    
    })
  }
    
  findAberto(): void {
    this.service.findAberto().subscribe(resposta => {
      this.abertoChamados = resposta;
    
    this.porcentagensAbertos = Math.floor((this.abertoChamados / this.totalChamados) * 100);
    })
  }
    
  findAndamento(): void {
    this.service.findAndamento().subscribe(resposta => {
      this.andamentoChamados = resposta;
     this.porcentagensAndamento = Math.floor((this.andamentoChamados / this.totalChamados) * 100);
    
    })
  }
  findFechado(): void {
    this.service.findFechado().subscribe(resposta => {
      this.fechadoChamados = resposta;
      this.porcentagensFechados = Math.floor((this.fechadoChamados / this.totalChamados) * 100) ;
    })

  }


}
