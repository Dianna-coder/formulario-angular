import { AngularMaterialModule } from './angular-material/angular-material.module';
import { DropdownService } from './services/dropdown.service';
import { InputFieldComponent } from './input-field/input-field.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { NgxMaskModule } from 'ngx-mask';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ErrorMsgComponent,
    CampoControlErroComponent,
    FormDebugComponent,
    InputFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgxMaskModule,
    TextMaskModule
  ],
  exports: [

    CampoControlErroComponent,
    ErrorMsgComponent,
    FormDebugComponent,
    InputFieldComponent,
    AngularMaterialModule
  ],
  providers: [ DropdownService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
