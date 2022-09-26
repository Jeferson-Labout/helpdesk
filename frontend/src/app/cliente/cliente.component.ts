import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { QuantidadeItensPaginacao } from '../modalShared/quantidadeItensPaginacao';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
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

  clientes: Cliente[] = []
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private service: ClienteService
  ) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.findAllPaginada(this.pagina, this.tamanho);
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);



  // findAll() {
  //   this.service.findAll().subscribe(resposta => {
  //     this.clientes = resposta
  //     this.dataSource = new MatTableDataSource<Cliente>(resposta);
  //     this.dataSource.paginator = this.paginator;
  //   })
  // }

  findAllPaginada(pagina: number, tamanho: number) {
    this.service.findAllPaginada(pagina, tamanho).subscribe(resposta => {
      this.clientes = resposta.content
      this.totalElementos = resposta.totalElements;// pegar o total de elementos
      this.pagina = resposta.number;// pegar o nu   
      this.qdtPaginas = resposta.totalPages;// pegar o nu   
      this.itensgrid = resposta.numberOfElements;// pegar o nu   
      this.last = resposta.last;// pegar o nu      

    })
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.service.getNomePaginada(this.pagina, this.tamanho, filterValue).subscribe(resposta => {
      this.clientes = resposta.content
      this.totalElementos = resposta.totalElements;// pegar o total de elementos
      this.pagina = resposta.number;// pegar o nu   
      this.qdtPaginas = resposta.totalPages;// pegar o nu   
      this.itensgrid = resposta.numberOfElements;// pegar o nu   
      this.last = resposta.last;// pegar o nu  
    })

  }

  mudarPagina(event: any): void {
    this.pagina = (event.page - 1);
    // const endItem = event.page * event.itemsPerPage;

    this.findAllPaginada(this.pagina, this.tamanho);
  }

}
