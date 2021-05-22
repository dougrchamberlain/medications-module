import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicationsContainerComponent } from './medications-container/medications-container.component';

const routes: Routes = [{ path: '', component: MedicationsContainerComponent }]; // leave it like this til we have the data mapped

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
