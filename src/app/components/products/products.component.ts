import { Component, OnInit } from '@angular/core';
import { ProductsService} from 'src/app/services/products.service';
    import { EventDrivenService } from 'src/app/services/event.driven.service';
import { Product } from 'src/app/model/product.model';
import { Observable, of } from 'rxjs';
import {catchError, map, startWith } from 'rxjs/operators';
import { AppDataState, DataStateEnum, ProductActionsTypes, ActionEvent } from '../../state/product.state';
import { Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$ : Observable<AppDataState<Product[]>> | null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productService:ProductsService,
  private router:Router,
  private eventDrivenService:EventDrivenService) { }

  ngOnInit(): void {
  this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent) => {
  this.onActionEvent(actionEvent);
    });
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
     onNewProduct(){
               this.router.navigateByUrl("/newProduct");
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
      onEdit(p:Product){
            this.router.navigateByUrl("/editProduct/"+p.id);
           }

    onActionEvent($event:ActionEvent){
    switch($event.type)
    {
    case ProductActionsTypes.GET_ALL_PRODUCTS : this.onGetAllProducts();break;
    case ProductActionsTypes.GET_SELECTED_PRODUCTS : this.onGetSelectedProducts();break;
    case ProductActionsTypes.GET_AVAILABLE_PRODUCTS : this.onGetAvailableProducts();break;
    case ProductActionsTypes.GET_SEARCH_PRODUCTS : this.onSearch($event.payload);break;
    case ProductActionsTypes.NEW_PRODUCT : this.onNewProduct();break;
    case ProductActionsTypes.SELECT_PRODUCT : this.onSelect($event.payload);break;
    case ProductActionsTypes.DELETE_PRODUCT : this.onDeleteProduct($event.payload);break;
    case ProductActionsTypes.EDIT_PRODUCT : this.onEdit($event.payload);break;

    }

    }

}
