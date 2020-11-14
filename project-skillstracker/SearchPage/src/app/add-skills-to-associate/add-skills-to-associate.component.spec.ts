import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillsToAssociateComponent } from './add-skills-to-associate.component';

describe('AddSkillsToAssociateComponent', () => {
  let component: AddSkillsToAssociateComponent;
  let fixture: ComponentFixture<AddSkillsToAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillsToAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillsToAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
