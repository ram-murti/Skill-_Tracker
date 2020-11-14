import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsDemoComponent } from './cards-demo.component';

describe('CardsDemoComponent', () => {
  let component: CardsDemoComponent;
  let fixture: ComponentFixture<CardsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
