import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId:number;
  productFormGroup?:FormGroup;
  submitted:boolean=false;
  constructor(private fb:FormBuilder,private productsService:ProductsService,private activatedRoute:ActivatedRoute) {
  this.productId=activatedRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
  this.productsService.getProduct(this.productId).subscribe(
  product =>{ this.productFormGroup=this.fb.group(
  {
  id:[product.id,Validators.required],
  name:[product.name,Validators.required],
  price:[product.price,Validators.required],
  quantity:[product.quantity,Validators.required],
  available:[product.available,Validators.required],
  selected:[product.selected,Validators.required]
  })
  });
  }
  onEditProduct(){
  this.submitted=true;
  if(this.productFormGroup?.invalid) return;
  this.productsService.editProduct(this.productFormGroup?.value).subscribe(p=>{alert("success modified")});
  }

}
