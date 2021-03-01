import { Injectable } from "@angular/core";
import { LoadingController } from '@ionic/angular';


@Injectable()
export class LoaderService {

  private $visible: boolean = false;

  private defaultMessage: string = "Cargando...";

  private loader: HTMLIonLoadingElement;

  public get visible(): boolean {
    return this.$visible;
  }
  
  constructor(
    private loaderCtrl: LoadingController
  ) { }
  
  public async show(message?: string) {
    if (this.$visible) {
      return;
    }
    this.loader = await this.loaderCtrl.create({
      message: (message) ? message : this.defaultMessage
    });

    this.$visible = true;

    return await this.loader.present();
  }

  public hide(): void {
    if (this.$visible) {
      this.loader.dismiss();
      this.$visible = false;
    }
  }
  
}