import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Cliente } from '../models/cliente';
import { ClientePaginacaoViewModel } from '../retornoApi/ClientePaginacaoViewModel';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);


  }

  findAllPaginada(page: number, size: number): Observable<ClientePaginacaoViewModel> {
    if (Number.isNaN(page)) {
      page=0;
     
    }
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    return this.http.get<ClientePaginacaoViewModel>(`${API_CONFIG.baseUrl}/clientes?${params.toString()}`);
  }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes/all`);
  }

  getNomePaginada(page: number, size: number, nome:any): Observable<ClientePaginacaoViewModel> {
    if (Number.isNaN(page)) {
      page=0;
     
    }
    console.log(nome.nome);
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('nome', nome.nome.toString());

    return this.http.get<ClientePaginacaoViewModel>(`${API_CONFIG.baseUrl}/clientes/nome?${params.toString()}`);
  }

  buscarClientes(page: number, size: number, keyword?: string): Observable<ClientePaginacaoViewModel> {
    // Criar parâmetros de consulta
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (keyword) {
      params = params.set('keyword', keyword);
    }

    // Fazer a chamada HTTP
    return this.http.get<ClientePaginacaoViewModel>(`${API_CONFIG.baseUrl}/clientes`, { params });
  }

  create(cliente: Cliente): Observable<Cliente> {

    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, cliente);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes/${cliente.id}`, cliente);
  }
  delete(id: any): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }


}
