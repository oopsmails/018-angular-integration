import { Directive, OnChanges, ElementRef, Renderer2, SimpleChanges, Input } from '@angular/core';


@Directive({
  selector: '[elementChanging]'
})
export class ElementChangingDirective implements OnChanges {
  @Input() elementChanging = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    const parent = this.renderer.parentNode(this.elRef.nativeElement);
    if (changes.elementChanging.currentValue) {
      this.renderer.setStyle(parent, 'color', 'blue');
    } else {
      this.renderer.setStyle(parent, 'color', 'yellow');
    }
  }
}

