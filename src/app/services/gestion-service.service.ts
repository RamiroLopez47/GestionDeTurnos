import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {ISala} from 'src/app/interfaces/ISala';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GestionServiceService {


  private _actualizar$ = new Subject<void>();

  constructor(private http: HttpClient) {
      
  }  
  protected miUrl: string = "http://localhost:9001/api/v1/sala";

  getActualizar(){
    return this._actualizar$;
  }


  getAll(page: number, size: number): Observable<ISala[]> {
    return this.http.get<ISala[]>(this.miUrl+`?page=${page}&size=${size}`);
  }
  

  getOne(id: number): Observable<ISala> {   
      return this.http.get<ISala>(this.miUrl + '/' + id);     
  }

  delete(id: number): Observable<any> {
    try {
      
    return this.http.delete(this.miUrl + '/' + id)
    .pipe(tap(()=>{
      this._actualizar$.next();
    }));
    } catch (error) {
      console.log(error,"Error en DELETE");
    }
    
  }

  post(entity: ISala): Observable<ISala> {
    return this.http.post<ISala>(this.miUrl + '/', entity)
    .pipe(tap(()=>{
      this._actualizar$.next();
    }));
  }

  put(id: number, entity: ISala): Observable<ISala> {
    try {                  
       return this.http.put<ISala>(`${this.miUrl}/${id}`, entity)
       .pipe(tap(()=>{
        this._actualizar$.next();
      }));
    } catch (error) {
      console.log(error,"Error en PUT");
    }
  }


}
