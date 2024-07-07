import { Component, Input, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ChangeDetectionStrategy, ComponentRef, OnChanges, SimpleChanges, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'custom-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomModalComponent implements OnInit {
  @Input() width: string = "80vw";
  @Input() height: string = "80vh";
  @Input() title: string = "";
  @Input() component: any;
  @Input() items!: any[];
  @Input() close!:  void;
  constructor() { }

  ngOnInit(): void {
  }

}