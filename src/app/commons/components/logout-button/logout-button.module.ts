import { LogoutButtonComponent } from 'src/app/commons/components/logout-button/logout-button.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
    declarations: [
        LogoutButtonComponent
    ],
    exports: [
        LogoutButtonComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class LogoutButtonComponentModule {}
