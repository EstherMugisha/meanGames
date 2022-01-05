import { Component, OnInit } from '@angular/core';
//import { FormControl,FormGroup } from '@angular/forms';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css']
})
export class RegisterReactiveComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
      this.registrationForm=this._formBuilder.group({
        name: ["Jack", Validators.required],
        username: ["Jack2021", [Validators.required, Validators.minLength(6)]],
        password: ["123", Validators.required],
        passwordRepeat: ["123",Validators.required],
      })
    }

  // ngOnInit(): void {
  //   this.registrationForm=new FormGroup({
  //     name: new FormControl("Jack"),
  //     username: new FormControl("Jack2021"),
  //     password: new FormControl("123"),
  //     passwordRepeat: new FormControl("123"),
  //   })
  // }

  onSubmit(form:FormGroup):void{
    console.log("Form submited");
    console.log(form.value.name);
    
  }

}
