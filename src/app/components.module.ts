import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FacebookComponent } from './components/facebook/facebook.component'

@NgModule({
    declarations:[FacebookComponent],
    imports:[IonicModule],
    exports:[FacebookComponent]
})
export class ComponentsModule{}