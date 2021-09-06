import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  console.log("ambiente de producción");
  console.log("url:"+environment.url_service);
}else{
  console.log("ambiente de desarrollo");
  console.log("url:"+environment.url_service);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
