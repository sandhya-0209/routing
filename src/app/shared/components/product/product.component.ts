import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Iproduct } from '../../models/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  prodArr !: Array<Iproduct>
  prodId!: string;
  prodObj!: Iproduct;
  selectedImg !: string

   constructor(
    private _prodService : ProductsService,
    private _route : ActivatedRoute
  ) { }


  isDark = false;
  toggleColor() : void{
    this.isDark = ! this.isDark;
  }
  count = 1;
  increment() : void{
    this.count ++ ;
  }
  decrement() : void {
    if(this.count > 1){
      this.count -- ;
    }else{
      this.count
    }
  }

  ngOnInit(): void {
     this.prodId = this._route.snapshot.params['_id'];
    this._prodService.getobj(this.prodId).subscribe((res) => {
      this.prodObj = res;
      this.selectedImg = this.prodObj.images[0];
    })
  }

    onimgChange(img: string) {
    this.selectedImg = img;
  }

}
