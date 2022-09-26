import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Tecnico } from '../models/tecnico';
import { TecnicoPaginacaoViewModel } from '../retornoApi/TecnicoPaginacaoViewModel';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);


  }
  findAllPaginada(page: number, size: number): Observable<TecnicoPaginacaoViewModel> {
    if (Number.isNaN(page)) {
      page=0;
     
    }
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    return this.http.get<TecnicoPaginacaoViewModel>(`${API_CONFIG.baseUrl}/tecnicos?${params.toString()}`);
  }

  
  getNomePaginada(page: number, size: number, nome:any): Observable<TecnicoPaginacaoViewModel> {
    if (Number.isNaN(page)) {
      page=0;
     
    }
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString()).set('nome', nome.toString());

    return this.http.get<TecnicoPaginacaoViewModel>(`${API_CONFIG.baseUrl}/tecnicos/nome?${params.toString()}`);
  }

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos/all`);
  }



  create(tecnico: Tecnico): Observable<Tecnico> {

    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos`, tecnico);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${tecnico.id}`, tecnico);
  }
  delete(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }
}
