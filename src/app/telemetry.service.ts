import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import { environment } from '../environments/environment';
// move this to a common service and create a directive that can add it as needed

@Injectable({ providedIn: 'root' })
export class TelemetryService {
  appInsights: ApplicationInsights;
  constructor() {
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: environment.microsoft.instrumentationKey //done
      }
    });
    this.appInsights.loadAppInsights();
  }
  logPageView(name?: string, url?: string): void {
    // option to call manually
    this.appInsights.trackPageView({
      name,
      uri: url
    });
  }

  logEvent(name: string, properties?: { [key: string]: any }): void {
    this.appInsights.trackEvent({ name }, properties);
  }

  logMetric(
    name: string,
    average: number,
    properties?: { [key: string]: any }
  ): void {
    this.appInsights.trackMetric({ name, average }, properties);
  }

  logException(exception: Error, severityLevel?: number): void {
    this.appInsights.trackException({
      exception,
      severityLevel
    });
  }

  logTrace(message: string, properties?: { [key: string]: any }): void {
    this.appInsights.trackTrace({ message }, properties);
  }
}
