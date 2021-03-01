import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UsageBoxComponent } from './usage-box.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        UsageBoxComponent
    ],
    exports: [
        UsageBoxComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class UsageBoxComponentModule {}
