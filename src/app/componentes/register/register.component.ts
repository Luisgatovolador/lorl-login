import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '../../interfaces/auth';
import { FormGroup } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directives';

import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private mensaje: MessageService
    ) {



    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    });
  }

  get fullname() {
    return this.registerForm.controls['fullname'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
 
  enviarRegistro() {
    const data = { ...this.registerForm.value };

    delete data.confirmPassword;

  this.authService.registerUser(data as User).subscribe(
    (response: any)=> {
      console.log(response)
      this.mensaje.add({ severity: 'success', summary: 'Success',
    detail: 'Registro Agregado'});

    },
    (error: any) => console.log(error)
  )
  
  }
}
