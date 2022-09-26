import { Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { QuantidadeItensPaginacao } from '../modalShared/quantidadeItensPaginacao';
import { navbarData } from '../sidenav/nav-data';
interface ChamadoToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.component.html',
  styleUrls: ['./chamado.component.scss']
})
export class ChamadoComponent implements OnInit {
  @Output() onTogglesChamado: EventEmitter<ChamadoToggle> = new EventEmitter();
  collapsed = false;
  pgIndex = 2;
  screenWidth = 0;
  firstLastButtons = true;
  totalElementos = 0;
  pagina = 0;
  last = false;
  qdtPaginas = 0;
  itensgrid = 0;
  tamanho = 5;
  status = '';
  pageSizeOptions: QuantidadeItensPaginacao[] = QuantidadeItensPaginacao.listaQuantidades
 


  chamados: Chamado[] = []
  FILTERED_DATA: Chamado[] = []
  modalChamado: boolean;
  displayedColumns: string[];
  // displayedColumns2: string[] =  [ 'id','titulo', 'cliente', 'tecnico', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.chamados);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ChamadoService
  ) { }

  ngOnInit(): void {

    this.screenWidth = window.innerWidth;
    if (window.innerWidth >= 960) {
      this.displayedColumns = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
    } else {
      this.displayedColumns = ['id', 'tecnico', 'cliente', 'acoes'];
    }

   
    this.findAllPaginada(this.pagina, this.tamanho);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 960) {
      this.collapsed = true;
      this.onTogglesChamado.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

      this.displayedColumns = ['id', 'cliente', 'tecnico', 'status', 'acoes'];

    }
    if (this.screenWidth >= 960) {
      this.collapsed = false;
      this.onTogglesChamado.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

      this.displayedColumns = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
    }



  }

  findAllPaginada(pagina: number, tamanho: number) {
    this.service.findAllPaginada(pagina, tamanho).subscribe(resposta => {
      this.chamados = resposta.content
      this.totalElementos = resposta.totalElements;// pegar o total de elementos
      this.pagina = resposta.number;// pegar o nu   
      this.qdtPaginas = resposta.totalPages;// pegar o nu   
      this.itensgrid = resposta.numberOfElements;// pegar o nu   
      this.last = resposta.last;// pegar o nu  

    })
  }
  getstatusPaginada(pagina: number, tamanho: number, status?: any) {
    this.service.getStatusPaginada(pagina, tamanho, status).subscribe(resposta => {
      this.chamados = resposta.content
      this.totalElementos = resposta.totalElements;// pegar o total de elementos
      this.pagina = resposta.number;// pegar o nu   
      this.qdtPaginas = resposta.totalPages;
      this.itensgrid = resposta.numberOfElements;
      this.last = resposta.last;
    })
  }
  // findAll(): void {
  //   this.service.findAll().subscribe(resposta => {
  //     this.chamado = resposta;
  //     this.dataSource = new MatTableDataSource<Chamado>(resposta);
  //     this.dataSource.paginator = this.paginator;
  //   })
  // }
  wideScreen(): Boolean {
    return window.innerWidth >= 960 ? true : false;

  }
  showModalChamado() {
    this.modalChamado = true;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service.getTituloPaginada(this.pagina, this.tamanho, filterValue).subscribe(resposta => {
      this.chamados = resposta.content
      this.totalElementos = resposta.totalElements;// pegar o total de elementos
      this.pagina = resposta.number;// pegar o nu   
      this.qdtPaginas = resposta.totalPages;
      this.itensgrid = resposta.numberOfElements;
      this.last = resposta.last;
    })
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
      this.status = 'ABERTO'
    } else if (status == '1') {
      this.status = 'ANDAMENTO'
    } else if (status == '2') {
      this.status = 'ENCERRADO'
    }

    this.status == '' ? this.findAllPaginada(this.pagina, this.tamanho) : this.getstatusPaginada(this.pagina, this.tamanho, this.status);
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize;
    this.findAllPaginada(this.pagina, this.tamanho);

  }

  mudarPagina(event: any): void {
    this.pagina = (event.page - 1);
    // const endItem = event.page * event.itemsPerPage;

    this.orderByStatus(this.status)

  }

}
