export class Webservice {

  constructor(private moduleUrl: string) {
  }

  protected async get(path: string) {
    try {
      const response = await fetch(this.createFullUrl(path));
      const retVal = this.returnFromResponse(response);
      return retVal;
    } catch(err) {
      // extra logging while developing
      console.error(err);
      throw err;
    }
  }

  protected async post(path: string, data: any) {
    try {
      console.log('posting');
      const postOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      };
      const response = await fetch(this.createFullUrl(path), postOptions);
      const retVal = this.returnFromResponse(response);
      return retVal;
    } catch(err) {
      // extra logging while developing
      console.error(err);
      throw err;
    }
  }

  private createFullUrl(url: string) {
    // TODO: could get server url in a better way, build parameters, json config, etc
    const serverBaseUrl: string = 'http://localhost:8080';
    return `${serverBaseUrl}${this.moduleUrl}${url}`;
  }

  private async returnFromResponse(response: Response) {
    const text = await response.text();
    if (response.status >= 200 && response.status < 300) {
      if (text.length) {
        return JSON.parse(text);
      } else {
        return;
      }
    } else {
      let errorMessage = text;
      try {
        const errorObj = JSON.parse(text);
        if (errorObj.message) {
          errorMessage = errorObj.message;
        }
      } catch (err) {
        // ignore json parse eroror
      }
      console.error(response.status, text);
      throw new Error(errorMessage)
    }
  }
}
