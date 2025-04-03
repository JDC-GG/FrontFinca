import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsetarUsuarioComponent } from './insetar-usuario.component';

describe('InsetarUsuarioComponent', () => {
  let component: InsetarUsuarioComponent;
  let fixture: ComponentFixture<InsetarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsetarUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsetarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
