import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register-template',
  templateUrl: './register-template.component.html',
  styleUrls: ['./register-template.component.css']
})
export class RegisterTemplateComponent implements OnInit {
  user!:User

  constructor() { }

  ngOnInit(): void {
    this.user={
      name:"Jack",
      username:"Jack2021",
      password:"123",
      passwordRepeat:"123"
    }

   // setTimeout(()=>{this.registrationForm.setValue(this.user)});
  }
  onSubmit(registrationForm:NgForm){
    console.log("submitted");
    console.log("values are", registrationForm.value);
    
  }

  onClear(form:NgForm){
    form.resetForm()
  }

}

export class User{
  name !:string
  username!:string
  password!:string
  passwordRepeat!:string
}
