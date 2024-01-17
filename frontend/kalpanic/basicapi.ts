// api.ts
// api.ts
import axios, { AxiosError, AxiosResponse } from 'axios';
import { parseCookies, setCookie } from 'nookies';

class BasicApi {
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.API_URL || 'http://localhost:8000';
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  private handleError(error: AxiosError): never {
    if (axios.isAxiosError(error)) {
      // console.error('API request failed:', error.response.status);
      // if (error.response.status== 401){
      //   throw "401 error"
      // }
      throw error;
    } else {
      console.error('Non-Axios error occurred:', error);
      throw error;
    }
  }



  async fetchData<T>(endpoint: string, add_auth_token: boolean= true): Promise<T> {
    try {

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (add_auth_token) {

        const { accessToken } = parseCookies();
        headers['Authorization'] = `Bearer ${accessToken}`

        }

      const response = await axios.get<T>(`${this.apiUrl}/${endpoint}`, {
        headers,
      });
      return this.handleResponse<T>(response);
    } catch (error:any) {
      this.handleError(error);
    }
  }



  async postData<T>(payload: any, endpoint: string, add_auth_token: boolean= true): Promise<T> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (add_auth_token) {

        const { accessToken } = parseCookies();
        headers['Authorization'] = `Bearer ${accessToken}`

        }

      const response = await axios.post<T>(`${this.apiUrl}${endpoint}`, payload, {
        headers: headers,
      });

      return this.handleResponse<T>(response);
    } catch (error:any) {
      this.handleError(error);
    }
  }



  async patchData<T>(payload: any, endpoint: string, add_auth_token: boolean= true): Promise<T> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (add_auth_token) {

        const { accessToken } = parseCookies();
        headers['Authorization'] = `Bearer ${accessToken}`

        }

            const response = await axios.patch<T>(`${this.apiUrl}/${endpoint}`, payload, {
              headers,
            });

      return this.handleResponse<T>(response);
    } catch (error:any) {
      this.handleError(error);
    }
  }



  async putData<T>(payload: any, endpoint: string, add_auth_token: boolean= true): Promise<T> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (add_auth_token) {

        const { accessToken } = parseCookies();
        headers['Authorization'] = `Bearer ${accessToken}`

        }

            const response = await axios.put<T>(`${this.apiUrl}/${endpoint}`, payload, {
              headers,
            });

      return this.handleResponse<T>(response);
    } catch (error:any) {
      this.handleError(error);
    }
  }


}










export default BasicApi;









  // async fetchData<T>(endpoint: string): Promise<T> {
  //   try {
  //     const response = await axios.get<T>(`${this.apiUrl}/${endpoint}`);
  //     return this.handleResponse<T>(response);
  //   } catch (error) {
  //     this.handleError(error);
  //   }
  // }


  


    // async getAuth(formData: any): Promise<any> {

    //   const response = await axios.post(`${this.apiUrl}/api/token/`, formData);
    //   const data = await response.json();
    //   console.log(data)
    //   return data;
    // }
  
    // async postData(endpoint: string, payload: any): Promise<any> {

    //   const response = await fetch(`https://api.example.com/${endpoint}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });
    //   const data = await response.json();
    //   return data;
    // }
  

  
  

  