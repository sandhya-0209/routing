import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  BASE_URL : string = `${environment.baseurl}`;
  PRODUCT_URL : string = `${this.BASE_URL}/products`;
  books_url:string=`${this.BASE_URL}/products/filter`
  productsData !: Array<Iproduct>
  getPagiData$ : Subject<Array<Iproduct>> = new Subject<Array<Iproduct>>();
  
  constructor(
    private _http : HttpClient
  ) { }
 
    fetchAllData(page:number, limit:number): Observable<Array<Iproduct>> {
    return this._http.get<Array<Iproduct>>(`${this.PRODUCT_URL}?page=${page}&limit=${limit}`)
  }

  getPaginationData(): Observable<Array<Iproduct>>{
    return this._http.get<Array<Iproduct>>(`${this.PRODUCT_URL}`)
  }

  getobj(prodId: string): Observable<Iproduct> {
    return this._http.get<Iproduct>(`${this.PRODUCT_URL}/${prodId}`);
  }

}
