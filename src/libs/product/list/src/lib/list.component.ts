import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule,
    FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  sortOrderOptions = [
    { value: true, label: 'Tăng dần' },
    { value: false, label: 'Giảm dần' }
  ];
  productTypes = [{ value: 1, label: 'Túi xách' },{ value: 2, label: 'Balo' },{ value: 3, label: 'Ví' }];

  searchForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
      minPrice: [null],
      maxPrice: [null],
      productTypes: [1],
      sortOrder: [true]
    });
    this.route.queryParams.subscribe((params) => {
      this.searchForm.patchValue({
        productTypes: parseInt(params['productType'])
      })
    });
  }
  ngOnInit(): void {
  }
  generateForm() {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
      minPrice: [null],
      maxPrice: [null],
      sortOrder: [true]
    });
  }
}
