import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FxBuilderConfiguration, FxComponentBuilder, FxForm, FxMode, FxScope, FxUtils } from '@instantsys-labs/fx';
import { DispatchToClinicComponent } from './custom-controls/dispatch-to-clinic/dispatch-to-clinic.component';
import { FxBuilderWrapperService } from './fx-builder-wrapper.service';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { UploaderCheckboxComponent } from './components/uploader-checkbox/uploader-checkbox.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DropdownWithOtherComponent } from './components/dropdown-with-other/dropdown-with-other.component';

@Component({
  selector: 'fx-builder-wrapper',
  standalone: true,
  imports: [CommonModule, FxComponentBuilder],
  template: `
    <fx-component-builder 
        #componentBuilder 
        [fx-form]="fxForm" 
        [configuration]="fxConfiguration" 
        [scope]="FxScope.BUILDER"
        >
    </fx-component-builder>
  `,
  styleUrl: './form-builder.css',
})
export class FxBuilderWrapperComponent implements OnInit {
  @ViewChild('componentBuilder') componentBuilder!: FxComponentBuilder;
  @Input({ alias: 'fx-form', required: true }) fxForm: FxForm = FxUtils.createNewForm();
  public fxMode: FxMode = FxMode.EDIT;
  public fxConfiguration: FxBuilderConfiguration = {
    settings: true,
    logics: true,
    customControls: true,
  }

  protected readonly FxScope = FxScope;
  protected readonly FxMode = FxMode;

  constructor(private fxWrapperService: FxBuilderWrapperService) { }

  public ngOnInit(): void {
    if (!Boolean(this.fxWrapperService.getComponent('dispatch-to-clinic'))) {
      this.fxWrapperService.registerCustomComponent('Dispatch To Clinic', 'dispatch-to-clinic', DispatchToClinicComponent);
    }
    if (!Boolean(this.fxWrapperService.getComponent('dynamic-table'))) {
      this.fxWrapperService.registerCustomComponent('Dynamic Table', 'dynamic-table', DynamicTableComponent);
    }
    if (!Boolean(this.fxWrapperService.getComponent('toggle-button'))) {
      this.fxWrapperService.registerCustomComponent('Toggle Button', 'toggle-button', ToggleButtonComponent);
    }
    if (!Boolean(this.fxWrapperService.getComponent('uploader'))) {
      this.fxWrapperService.registerCustomComponent('Uploader', 'uploader', UploaderComponent);
    }
    if (!Boolean(this.fxWrapperService.getComponent('uploader-checkbox'))) {
      this.fxWrapperService.registerCustomComponent('Uploader with Checkbox', 'uploader-checkbox', UploaderCheckboxComponent);
    }
    if (!Boolean(this.fxWrapperService.getComponent('toggle'))) {
      this.fxWrapperService.registerCustomComponent('Toggle', 'toggle', ToggleComponent);
    }
    if (!Boolean(this.fxWrapperService.getComponent('lib-date-picker'))) {
      this.fxWrapperService.registerCustomComponent('Date Picker', 'lib-date-picker', DatePickerComponent);
    }
        if (!Boolean(this.fxWrapperService.getComponent('dropdown-with-other'))) {
      this.fxWrapperService.registerCustomComponent('Smartlist with Other', 'dropdown-with-other', DropdownWithOtherComponent);
    }
  };

  public getParsedForm(): FxForm {
    return this.componentBuilder.getParsedForm();
  }

  public getInitializedFxForm(): FxForm {
    return FxUtils.createNewForm(); 
  }
}


