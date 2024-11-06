import axios from "axios";

export const commonApi = async(httpMethods,url,reqBody,reqHeader)=>{
    const reqConfig = {
        method:httpMethods,
        url: url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"} //there are two types of content to upload
    }
    return await axios(reqConfig).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}
