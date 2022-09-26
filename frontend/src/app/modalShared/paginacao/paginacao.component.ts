import {
  Component, OnInit, Input, Output, EventEmitter,

} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit {


  @Input() totalItems: number;
  @Input() qdtPaginas: number;
  @Input() itemsPerPage: number;
  @Input() itensgrid: number;
  @Input() last: boolean;


  @Output() onPaginate: EventEmitter<number> = new EventEmitter<number>();

  paginaParcial: number = 0;
  pagina: number = 1;
  ultimaPagina: number = 0;
  qtdPorPagina: number = 0;
  showBoundaryLinks: boolean = true;


  constructor() { }

  ngOnInit() {


    setTimeout(() => {
      this.somaPaginacao();
    }, 500)
  }




  somaPaginacao() {



    setTimeout(() => {

 

      this.qtdPorPagina = this.pagina >= this.qdtPaginas ? this.totalItems : (this.pagina * this.itemsPerPage);
      this.ultimaPagina = this.totalItems == this.itensgrid && this.itensgrid == 0 ? 0 : (this.totalItems - this.itensgrid) + 1;
      this.paginaParcial = this.last ? this.ultimaPagina : ((this.itemsPerPage * this.pagina) + 1) - this.itensgrid;



    }, 100)
  }

  mudarPagina(event: any) {

    this.onPaginate.emit(event);
    this.somaPaginacao();
    this.pagina = event.page;

  }


}
