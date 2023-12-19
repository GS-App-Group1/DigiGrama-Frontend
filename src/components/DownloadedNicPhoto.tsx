import { useEffect, useState } from 'react'
import { nicImageAPI } from '../data/api';


const DownloadedNicPhoto = (props:{requestID:string}) => {
    const [downloadedNicPhoto, setDownloadedNicPhoto] = useState("");

    useEffect(()=>{
        const url = new URL(nicImageAPI.urls.download);
        const params={requestID:props.requestID};
        url.search = new URLSearchParams(params).toString();
        const options = {
            headers: {
                "accept":"image/jpeg",
                "API-Key":nicImageAPI.key
        },
        };

        fetch(url, options)
        .then((res) => res.blob())
        .then((blob) => {
            setDownloadedNicPhoto(URL.createObjectURL(blob));
        });
    },[])
    return (
        <img src={downloadedNicPhoto}/>
    )
}

export default DownloadedNicPhoto