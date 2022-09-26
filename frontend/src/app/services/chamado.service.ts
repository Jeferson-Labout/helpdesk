import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Chamado } from '../models/chamado';
import { ChamadoPaginacaoViewModel } from '../retornoApi/ChamadoPaginacaoViewModel';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${API_CONFIG.baseUrl}/chamados/${id}`);
  }

  findAllPaginada(page: number, size: number): Observable<ChamadoPaginacaoViewModel> {
    if (Number.isNaN(page)) {
      page=0;
     
    }
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    return this.http.get<ChamadoPaginacaoViewModel>(`${API_CONFIG.baseUrl}/chamados?${params.toString()}`);
  }
  getStatusPaginada(page: number, size: number, status?:any): Observable<ChamadoPaginacaoViewModel> {

    if (Number.isNaN(page)) {
      page=0;
     
    }
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('status', status.toString());

    return this.http.get<ChamadoPaginacaoViewModel>(`${API_CONFIG.baseUrl}/chamados/status?${params.toString()}`);
  }
  getTituloPaginada(page: number, size: number, titulo?:any): Observable<ChamadoPaginacaoViewModel> {
    if (Number.isNaN(page)) {
      page=0;
     
    }
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('titulo', titulo.toString());

    return this.http.get<ChamadoPaginacaoViewModel>(`${API_CONFIG.baseUrl}/chamados/titulo?${params.toString()}`);
  }

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados/all`);
  }
  findCount(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/chamados/count`);
  }
  findAberto(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/chamados/aberto`);
  }
  findAndamento(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/chamados/andamento`);
  }
  findFechado(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/chamados/fechado`);
  }
  findTop5(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados/limit`);
  }

  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${API_CONFIG.baseUrl}/chamados`, chamado);
  }

  update(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${API_CONFIG.baseUrl}/chamados/${chamado.id}`, chamado);
  }
}
