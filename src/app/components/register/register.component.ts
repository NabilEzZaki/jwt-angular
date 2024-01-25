import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }), { validator: this.passwordMathVariable }
   }

   passwordMathVariable(FormGroup: FormGroup) {
    const password = FormGroup.get('password')?.value;
    const confirmPassword = FormGroup.get('confirmPassword')?.value;
    if(password != confirmPassword){
      FormGroup.get('confirmPassword')?.setErrors({ passwordMissMatch: true});
    }else{
      FormGroup.get('confirmPassword')?.setErrors(null);
    }
   }

   submitForm(){
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).subscribe(
      (response) => {
        if (response.id != null) {
          alert("Hello " + response.name);
        }
      }
    )
   }

}
