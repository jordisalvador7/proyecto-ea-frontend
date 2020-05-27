import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FacebookComponent } from './components/facebook/facebook.component'
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
    declarations:[FacebookComponent, ChatComponent],
    imports:[IonicModule],
    exports:[FacebookComponent, ChatComponent]
})
export class ComponentsModule{}