import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[isVisible]'
})
export class IsVisibleDirective {

  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    //console.log(this.shouldShow);
    this.renderer.setStyle(this.elem.nativeElement, 'display', this.shouldShow ? "block" : "none");
  }

  @Input() shouldShow;
}
