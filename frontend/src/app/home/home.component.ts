import { Component, OnInit } from '@angular/core';
import { Chamado } from '../models/chamado';
import { ChamadoService } from '../services/chamado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chamados: Chamado[] = []

  totalChamados: number;
  abertoChamados: number;
  andamentoChamados: number;
  fechadoChamados: number;
 
  constructor( private service: ChamadoService) { }


  ngOnInit(): void {

    this. findTop5();
    this.  findCount();
    this.  findAberto();
    this.  findAndamento();
    this.  findFechado();
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
    
    
    })
  }
    
  findAndamento(): void {
    this.service.findAndamento().subscribe(resposta => {
      this.andamentoChamados = resposta;
 
    
    })
  }
  findFechado(): void {
    this.service.findFechado().subscribe(resposta => {
      this.fechadoChamados = resposta;
    
    })
  }


}
