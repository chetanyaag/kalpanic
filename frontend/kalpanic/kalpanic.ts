import BasicApi from "./basicapi";
import { parseCookies, setCookie } from 'nookies';

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


    async get_token(payload:any):Promise<any>{
        const endpoint = "/api/token/refresh/"
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
        const data:any = await this.basicapi.postData(payload,endpoint);
        return data;
    }

    //videos

    async get_all_videos(status: string):Promise<any>{
        const endpoint = `/videos/?status=${status}`
        const data:any = await this.basicapi.fetchData(endpoint);
        return data
    }

    async update_a_video(video_id: number, status: string): Promise<any>{
        const endpoint = `/videos/${video_id}/`
        const payload = {
            "status": `${status}`
        }
        const data:any = await  this.basicapi.patchData(payload, endpoint);
        return data
    }


    // platfrom

    async get_all_platfroms():Promise<any>{
        const endpoint = `/platform/`
        const data:any = await this.basicapi.fetchData(endpoint);
        return data
    }


    // accounts
    async create_a_account(payload:any):Promise<any>{
        const endpoint = "/accounts/"
        const data:any = await this.basicapi.postData(payload,endpoint);
        return data;
    }

    async update_a_account(account_id:number, payload:any):Promise<any>{
        const endpoint = `/accounts/${account_id}/`
        const data:any = await this.basicapi.patchData(payload,endpoint);
        return data;
    }

    async get_all_accounts():Promise<any>{
        const endpoint = `/accounts/`
        const data:any = await this.basicapi.fetchData(endpoint);
        return data
    }


    // publish 
    async create_a_publish(payload:any):Promise<any>{
        const endpoint = "/publish/"
        const data:any = await this.basicapi.postData(payload,endpoint);
        return data;
    }



}

export default KalpanicApi;