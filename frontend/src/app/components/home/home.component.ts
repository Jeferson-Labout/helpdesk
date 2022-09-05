import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ChamadoService) { }

  ngOnInit(): void {

    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {

      var abertos = resposta.filter(resposta => resposta.status == 2)





    })
  }
}
