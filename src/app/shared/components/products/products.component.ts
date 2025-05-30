import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from '../../models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsArr !: Array<Iproduct>
  getPaginationData !: Array<Iproduct>
   isImg: any = null;
  isLike: boolean = false;
  constructor(
    // private _productService : ProductsService
    private _productService : ProductsService
  ) { }

  ngOnInit(): void {
    // this.productsArr = this._productService.fetchAllproducts()
    // console.log(this.productsArr)
    this.paginationData()
  //  console.log(this.getPaginationData);
    this.getPageinationData()
  }

  paginationData(){
    this._productService.getPagiData$.subscribe(res=>{
    this.getPaginationData = res
    })
  }

  getPageinationData() {
    this._productService.getPaginationData().subscribe((res: any) => {
      console.log(res.data);
      this._productService.getPagiData$.next(res.data)
    })
  }

  visibilility(event: Event) {
    event.stopPropagation();
    this.isLike = !this.isLike;
  }
}