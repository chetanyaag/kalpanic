import BasicApi from "./basicapi";
import { parseCookies, setCookie } from 'nookies';
import axios, { AxiosError, AxiosResponse } from 'axios';
class KalpanicApi{


    private basicapi = new BasicApi()


    //auth apis
    async get_login(payload:any):Promise<any>{
        const endpoint = "/api/token/"
        const data:any = await this.basicapi.postData(payload,endpoint, false );
      setCookie(null, 'accessToken', data.access, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
      setCookie(null, 'authToken', data.refresh, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
        return data;
    }


    async get_token():Promise<any>{
        const endpoint = "/api/token/refresh/"
        const { authToken } = parseCookies();
        const payload = {
            "refresh": authToken
        }
        const data:any = await this.basicapi.postData(payload,endpoint, false);
      setCookie(null, 'accessToken', data.access, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
        return data;
    }
    

    //SearchTerm

    async create_a_seacrhterm(payload:any):Promise<any>{
        const endpoint = "/searchterms/"
        try{
            const data:any = await this.basicapi.postData(payload,endpoint);
            return data;
        }
        catch(error:any){

        if (error.response.status== 401){
            this.get_token()
            window.location.reload()
        }

        }

    }

    //videos

    async get_all_videos(status: string):Promise<any>{
        const endpoint = `/videos/?status=${status}`


        try{
            const data:any = await this.basicapi.fetchData(endpoint);
            return data
        }
        catch(error:any){

        if (error.response.status== 401){
            this.get_token()
            window.location.reload()
        }

        }


    }

    async update_a_video(video_id: number, status: string): Promise<any>{
        const endpoint = `/videos/${video_id}/`
        try{
            const payload = {
                "status": `${status}`
            }
            const data:any = await  this.basicapi.patchData(payload, endpoint);
            return data
        }
        catch(error:any){

        if (error.response.status== 401){
            this.get_token()
            window.location.reload()
        }

        }
  
    }


    // platfrom

    async get_all_platfroms():Promise<any>{
        const endpoint = `/platform/`
        try{
            const data:any = await this.basicapi.fetchData(endpoint);
            return data
        }
        catch(error:any){

        if (error.response.status== 401){
            this.get_token()
            window.location.reload()
        }

        }

    }


    // accounts
    async create_a_account(payload:any):Promise<any>{
        const endpoint = "/accounts/"
        try{
            const data:any = await this.basicapi.postData(payload,endpoint);
            return data;
        }
        catch(error:any){

        if (error.response.status== 401){
            this.get_token()
            window.location.reload()
        }

        }

    }

    async update_a_account(account_id:number, payload:any):Promise<any>{
        const endpoint = `/accounts/${account_id}/`
        try{
            const data:any = await this.basicapi.patchData(payload,endpoint);
            return data;
        }
        catch(error:any){

        if (error.response.status== 401){
            this.get_token()
            window.location.reload()
        }

        }

    }

    async get_all_accounts():Promise<any>{
        const endpoint = `/accounts/`
        try{
            const data:any = await this.basicapi.fetchData(endpoint);
            return data
        }
        catch(error:any){

        if (error.response.status== 401){
            this.get_token()
            window.location.reload()
        }

        }

    }


    // publish 
    async create_a_publish(payload:any):Promise<any>{
        const endpoint = "/publish/"
        try{
            const data:any = await this.basicapi.postData(payload,endpoint);
            return data;
        }
        catch(error:any){

        if (error.response.status== 401){
            this.get_token()
            window.location.reload()
        }

        }

    }



}

export default KalpanicApi;