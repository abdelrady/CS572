import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[makeBigger]',
  // host: {
  //   '[style.font.size]': "12px"//this.fontSize + 
  // }
})
export class MakeBiggerDirective {
  fontSize = 14;

  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {

  }

  @HostListener('dblclick') hostDbClick() {
    // this.renderer.listen(this.elem.nativeElement, 'click', (event) => {
    this.fontSize += 2;
    console.log(this.fontSize);
    this.renderer.setStyle(this.elem.nativeElement, 'font-size', this.fontSize + 'px');
    // })
  }
}
