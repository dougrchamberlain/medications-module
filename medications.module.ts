import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './src/material-module';
import { TelemetryService } from './src/app/telemetry.service';
import { AppRoutingModule } from './src/app/app-routing.module';
import { MedicationsContainerComponent } from './src/app/medications-container/medications-container.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRootComponent } from './src/app/app-root/app-root.component';
import { HttpClientModule } from '@angular/common/http';
import { MedicationsService } from './src/app/medications.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  bootstrap: [AppRootComponent],
  entryComponents: [AppRootComponent],
  declarations: [MedicationsContainerComponent],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  providers: [TelemetryService]
})
export class MedicationsModule {}

@NgModule({
  bootstrap: [AppRootComponent],
  declarations: [AppRootComponent, MedicationsContainerComponent],
  entryComponents: [AppRootComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [MedicationsService, TelemetryService]
})
export class DocumentsModule {}

platformBrowserDynamic()
  .bootstrapModule(DocumentsModule)
  .catch(err => console.error(err));
