import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { QuantidadeItensPaginacao } from '../modalShared/quantidadeItensPaginacao';

interface CampoPesquisa {
  campo: keyof Cliente;
  query: string;
}
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
  dadosPesquisa: any = {}; // Objeto para armazenar os dados de pesquisa
  showFilter: boolean = false;
  camposPesquisa: CampoPesquisa[] = [];
  camposCliente: { label: string, value: keyof Cliente }[] = [
    { label: 'Código', value: 'id' },
    { label: 'Nome', value: 'nome' },
    { label: 'CPF', value: 'cpf' },
    { label: 'E-mail', value: 'email' },
    { label: 'Data de Criação', value: 'dataCriacao' },
    // Adicione mais campos conforme necessário
  ];
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


  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  adicionarCampoPesquisa() {
    const camposDisponiveis = this.camposCliente.filter(campo =>
      !this.camposPesquisa.some(campoPesquisa => campoPesquisa.campo === campo.value)
    );

    // Verifica se há campos disponíveis
    if (camposDisponiveis.length > 0) {
      // Seleciona o primeiro campo disponível
      const campoAleatorio = camposDisponiveis[0];
      this.camposPesquisa.push({ campo: campoAleatorio.value, query: "" });
    }
    this.showFilter = true;
  }

  removerCampoPesquisa(index: number) {
    this.camposPesquisa.splice(index, 1);
  }
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


  pesquisar() {
    // Reinicia os dados de pesquisa
    this.dadosPesquisa = {};

    // Adiciona os dados de pesquisa dos campos selecionados
    this.camposPesquisa.forEach(campo => {
      this.dadosPesquisa[campo.campo] = campo.query;
    });
    this.service.getNomePaginada(this.pagina, this.tamanho, this.dadosPesquisa).subscribe(resposta => {
      this.clientes = resposta.content
      this.totalElementos = resposta.totalElements;// pegar o total de elementos
      this.pagina = resposta.number;// pegar o nu   
      this.qdtPaginas = resposta.totalPages;// pegar o nu   
      this.itensgrid = resposta.numberOfElements;// pegar o nu   
      this.last = resposta.last;// pegar o nu  
    })
    // Aqui você pode enviar os dados de pesquisa para onde precisar, por exemplo, um serviço
    console.log("Dados de pesquisa:", this.dadosPesquisa);
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
