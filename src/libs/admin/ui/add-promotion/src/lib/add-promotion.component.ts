import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromotionsService } from './data-access/services';

@Component({
  selector: 'lib-add-promotion',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-promotion.component.html',
  styleUrl: './add-promotion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPromotionComponent implements OnInit {

  promotionName: string = '';
  discount: number = 0;
  startDate: string = '';
  endDate: string = '';
  image: File | null = null;
  imageUrl: string | null = null;

  constructor(private datePipe: DatePipe, private cd: ChangeDetectorRef, private service: PromotionsService) { }
  ngOnInit(): void {
  }
  validate(){
    if(this.promotionName.length == 0){
      return alert("Nhập tên")
    } else if (this.discount < 0){
      return alert("Nhập discount")
    } else if (this.startDate.length == 0){
      return alert("Kiểm date")
    } else if (this.endDate.length == 0){
      return alert("Kiểm date")
    } else if (this.image == null){
      return alert("Chọn ảnh")
    }
    return true
  }
  onSubmit(): void {
    if (!this.image) {
      alert('Please select an image.');
      return;
    }
    if(this.validate() == true){
      const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
      const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
      const formData = new FormData();
      formData.append('promotionName', this.promotionName);
      formData.append('discount', this.discount.toString());
      formData.append('startDate', formattedStartDate || '');
      formData.append('endDate', formattedEndDate || '');
      formData.append('image', this.image, this.image.name);
      this.service.addPromotions(formData).subscribe(resp => {
        if(resp.data){
          alert("Thêm thành công")
        }
      })
    }
  } 
  onFileSelected(event: any): void {
    this.image = event.target.files[0];
    this.imageUrl = URL.createObjectURL(event.target.files[0]);
    this.cd.markForCheck();
  }
}