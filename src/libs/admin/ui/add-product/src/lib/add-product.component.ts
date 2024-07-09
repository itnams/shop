import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AddProductService } from './data-access/services';

@Component({
  selector: 'lib-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent {
  productName: string = '';
  description: string = '';
  price: number = 0;
  oldPrice: number = 0;
  categoryId: number = 1;
  images: File[] = [];
  imagePreviews: string[] = [];
  productTypes = [{ value: 1, label: 'Túi xách' },{ value: 2, label: 'Balo' },{ value: 3, label: 'Ví' }];

  constructor(private cd: ChangeDetectorRef, private service: AddProductService) {}

  onFileChange = async (event: any) => {
    if (event.target.files.length > 0) {
      this.images = Array.from(event.target.files);
      this.imagePreviews = [];
      for (let file of this.images) {
        const preview = await this.readFileAsDataURL(file);
        this.imagePreviews.push(preview);
      }
      this.cd.detectChanges();
    }
  }
  validate(){
    if(this.productName.length == 0){
      return alert("Nhập tên sản phẩm")
    } else if (this.description.length == 0){
      return alert("Nhập chi tiết sản phẩm")
    } else if (this.price < 1){
      return alert("Kiểm tra giá")
    } else if (this.oldPrice < 1){
      return alert("Kiểm tra giá")
    } else if (this.images.length == 0){
      return alert("Chọn ít nhất 1 ảnh")
    }
    return true
  }
  readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('ProductName', this.productName);
    formData.append('Description', this.description);
    formData.append('Price', this.price.toString());
    formData.append('OldPrice', this.oldPrice.toString());
    formData.append('CategoryId', this.categoryId.toString());
    this.images.forEach(file => {
      formData.append('Images', file, file.name);
    });
    if(this.validate() == true){
      this.service.addProduct(formData).subscribe(resp=> {
          if(resp.success){
            alert("Thêm sản phẩm thành công")
          } else{
            alert("Thêm sản phẩm thất bại")
          }
      })
    }
  }
}