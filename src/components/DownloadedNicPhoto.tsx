import { useEffect, useState } from 'react'
import { nicImageAPI } from '../data/api';


const DownloadedNicPhoto = () => {
    const [downloadedNicPhoto, setDownloadedNicPhoto] = useState("");

    useEffect(()=>{
        const src = nicImageAPI.urls.download;
        const options = {
        headers: {
            "accept":"image/jpeg",
            "API-Key":nicImageAPI.key
        },
        };

        fetch(src, options)
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