import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { QuantidadeItensPaginacao } from '../modalShared/quantidadeItensPaginacao';
import { TecnicoPaginacaoViewModel } from '../retornoApi/TecnicoPaginacaoViewModel';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrls: ['./tecnico.component.scss']
})
export class TecnicoComponent implements AfterViewInit, OnInit {
  tecnicos: Tecnico[] = [];
  pgIndex = 2;
  screenWidth = 0;
  firstLastButtons = true; 
  totalElementos = 0;
  pagina = 0;
  last = false;
  qdtPaginas = 0;
  itensgrid = 0;
  tamanho = 5;
  pageSizeOptions: QuantidadeItensPaginacao[] = QuantidadeItensPaginacao.listaQuantidades

  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private service: TecnicoService
  ) { }

  ngOnInit(): void {

    this.screenWidth = window.innerWidth;
    this.findAllPaginada(this.pagina, this.tamanho);
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 702) {
      this.firstLastButtons = false;
    }
  }

  findAllPaginada(pagina: number, tamanho: number) {
    this.service.findAllPaginada(pagina, tamanho).subscribe(resposta => {
      this.tecnicos = resposta.content
      this.totalElementos = resposta.totalElements;// pegar o total de elementos
      this.pagina = resposta.number;// pegar o nu   
      this.qdtPaginas = resposta.totalPages;
      this.itensgrid = resposta.numberOfElements;
      this.last = resposta.last; 
    })
  }



  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize;
    this.findAllPaginada(this.pagina, this.tamanho);
  }

  // mudarPagina(event: any) {

  //   this.pagina = event.pageIndex;
  //   this.tamanho = event.pageSize;


  // }

  mudarPagina(event: any): void {
    this.pagina = (event.page - 1);
    // const endItem = event.page * event.itemsPerPage;

    this.findAllPaginada(this.pagina, this.tamanho);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service.getNomePaginada(this.pagina, this.tamanho, filterValue).subscribe(resposta => {
      this.tecnicos = resposta.content
      this.totalElementos = resposta.totalElements;// pegar o total de elementos
      this.pagina = resposta.number;// pegar o nu   
      this.qdtPaginas = resposta.totalPages;
      this.itensgrid = resposta.numberOfElements;
      this.last = resposta.last; 
    })
  }


}
