import { useEffect, useState } from "react";
import { nicImageAPI } from "../data/api";
// import { getToken } from "./utils";

// const token = await getToken(nicImageAPI.key);

const DownloadedNicPhoto = (props: { requestID: string; token: string }) => {
  const [downloadedNicPhoto, setDownloadedNicPhoto] = useState("");

  useEffect(() => {
    const url = new URL(nicImageAPI.urls.download);
    const params = { requestID: props.requestID };
    url.search = new URLSearchParams(params).toString();
    const options = {
      headers: {
        accept: "image/jpeg",
        Authorization: "Bearer " + props.token,
      },
    };

    fetch(url, options)
      .then((res) => res.blob())
      .then((blob) => {
        setDownloadedNicPhoto(URL.createObjectURL(blob));
        console.log("downloaded photo: " + downloadedNicPhoto.slice(5));
      });
  }, []);
  return <img src={downloadedNicPhoto} />;
};

export default DownloadedNicPhoto;
