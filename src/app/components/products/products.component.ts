import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/model/product.model';
import { Observable, of } from 'rxjs';
import {catchError, map, startWith } from 'rxjs/operators';
import { AppDataState, DataStateEnum } from '../../state/product.state';
import { Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //products?:Product[];//products:Product[] | null=null;
  products$ : Observable<AppDataState<Product[]>> | null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productService:ProductsService,private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
  //this.productService.getAllProducts().subscribe(data =>{this.products=data;},err=>{console.log(err);});
  this.products$=this.productService.getAllProducts().pipe(
  map(data => ({dataState:DataStateEnum.LOADED,data:data})),
  startWith({dataState:DataStateEnum.LOADING}),
  catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
  );
  }

   onGetSelectedProducts(){
   //this.productService.getSelectedProducts().subscribe(data =>this.products=data);
   //this.products$=this.productService.getSelectedProducts();
   this.products$=this.productService.getSelectedProducts().pipe(
     map(data => ({dataState:DataStateEnum.LOADED,data:data})),
     startWith({dataState:DataStateEnum.LOADING}),
     catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
     );
   }

   onGetAvailableProducts(){
   //this.productService.getAvailableProducts().subscribe(data =>this.products=data);
   //this.products$=this.productService.getAvailableProducts();
   this.products$=this.productService.getAvailableProducts().pipe(
     map(data => ({dataState:DataStateEnum.LOADED,data:data})),
     startWith({dataState:DataStateEnum.LOADING}),
     catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
     );
   }
   onSearch(dataForm:any){
   //console.log("dataForm.keyword:::"+dataForm.keyword);
   this.products$=this.productService.searchProducts(dataForm.keyword).pipe(
     map(data => ({dataState:DataStateEnum.LOADED,data:data})),
     startWith({dataState:DataStateEnum.LOADING}),
     catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
     );
   }
   onSelect(p:Product){
   this.productService.select(p).subscribe(
   data => {p.selected=data.selected;}
   );
   }
   onDeleteProduct(p:Product){
   let v=confirm("Etes vous sûre ?");
   if(v==true)
    this.productService.deleteProduct(p).subscribe(
    data => {this.onGetAllProducts();}
    );
   }
   onNewProduct(){
   this.router.navigateByUrl("/newProduct");
   }
   onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id);
   }
}
