import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { LoginStranicaComponent } from './login-stranica.component';
import { LoginService } from 'src/app/_shared/Login.service';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginStranicaComponent', () => {
  let component: LoginStranicaComponent;
  let fixture: ComponentFixture<LoginStranicaComponent>;
  let loginService: LoginService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [LoginStranicaComponent],
      providers: [LoginService, ToastrService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStranicaComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn to true after successful login', () => {
    const mockResponse = {
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken'
    };
    spyOn(loginService, 'authenticate').and.returnValue(of(mockResponse));

    const mockForm = {
      value: {
        username: 'tom',
        password: '123456'
      },
      invalid: false,
      resetForm: () => {}
    } as NgForm;
    
    component.onLogin(mockForm);
    
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should display success message on successful login', () => {
    spyOn(toastrService, 'success');
    const form: NgForm = new NgForm([], []);
  
    component.onLogin(form);
  
    expect(toastrService.success).toHaveBeenCalledWith('You are logged in');
  });

  it('should reset the form after successful login', fakeAsync(async () => {
    const form: NgForm = component.form;
    form.setValue({
      username: 'mockUsername',
      password: 'mockPassword'
    });
  
    spyOn(component, 'onLogin').and.returnValue(await Promise.resolve());
  
    component.onLogin(form);
    tick(); 
    
    expect(form.resetForm).toHaveBeenCalled();
  }));

  it('should display error message on failed login', () => {
    const errorMessage = 'Invalid credentials';
    spyOn(loginService, 'authenticate').and.returnValue(throwError(() => ({ error: { message: errorMessage } })));
    spyOn(toastrService, 'error');

    const mockForm = {
      value: {
        username: 'tom',
        password: '123456'
      },
      invalid: false,
      resetForm: () => {}
    } as NgForm;

    component.onLogin(mockForm);

    expect(toastrService.error).toHaveBeenCalledWith(errorMessage);
    expect(component.isLoginFailed).toBeTrue();
  });

});
