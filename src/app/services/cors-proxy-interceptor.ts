import { HttpEvent, HttpHandlerFn, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function corsProxyInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(
    req.clone({
      url: `https://proxy.corsfix.com/?${req.url}`,
      // url: `https://corsproxy.io/?${req.url}?resHeaders=cache-control:no-cache&resHeaders=expires:0&debug=1&ttl=0`,
    })
  );
}
