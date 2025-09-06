import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueFormComponent } from './marque-form.component';

describe('MarqueFormComponent', () => {
  let component: MarqueFormComponent;
  let fixture: ComponentFixture<MarqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarqueFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
