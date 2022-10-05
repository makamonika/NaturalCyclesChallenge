import { Directive, ElementRef, HostListener, Input, OnChanges, AfterViewInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[textFitter]'
})
export class TextFitterDirective implements AfterViewInit, OnChanges {

  @Input() innerText: string = "";

  private textElParent: HTMLElement;
  private textElement: HTMLElement;
  private defaultSize = 12;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.textElement = el.nativeElement;
    this.textElParent = this.textElement.parentElement as HTMLElement;
  }

  @HostListener('window:resize')
  onWindowResize = (): void => {
      this.setFontSize();
  };

  ngAfterViewInit() {
    this.setFontSize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['innerText']) {
      this.textElement.innerHTML = this.innerText;
      if (!changes['innerText'].firstChange) {
        this.setFontSize();
      }
    }
  }

  private setFontSize(): void {
    setTimeout(
      (() => {
        if (this.textElement.offsetHeight * this.textElement.offsetWidth !== 0) {
          this.setStyle(this.defaultSize);
          this.setStyle(this.recalculateFontSize());
        }
      }).bind(this),
      100
    );
  };

  private recalculateFontSize(): number {
    return this.defaultSize * ((this.textElParent.offsetWidth - 30) / this.textElement.offsetWidth);
  };

  private setStyle(fontSize: number): void {
    if(fontSize > 0 && !isNaN(fontSize)){
      this.renderer.setStyle(this.textElement, 'fontSize', fontSize.toString() + 'px');
    }
  };
}