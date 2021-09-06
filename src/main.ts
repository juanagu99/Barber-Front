import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  console.log("ambiente de producción");
}else{
  console.log("ambiente de desarrollo");
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
