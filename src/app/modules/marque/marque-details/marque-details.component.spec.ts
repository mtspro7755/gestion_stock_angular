import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueDetailsComponent } from './marque-details.component';

describe('MarqueDetailsComponent', () => {
  let component: MarqueDetailsComponent;
  let fixture: ComponentFixture<MarqueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarqueDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarqueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
