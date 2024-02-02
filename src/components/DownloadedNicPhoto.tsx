// import { useEffect, useState } from "react";
// import { nicImageAPI } from "../data/api";
// // import { getToken } from "./utils";

// // const token = await getToken(nicImageAPI.key);

// const DownloadedNicPhoto = (props: { requestID: string; token: string }) => {
//   const [downloadedNicPhoto, setDownloadedNicPhoto] = useState("");

//   useEffect(() => {
//     const url = new URL(nicImageAPI.urls.download);
//     const params = { requestID: props.requestID };
//     url.search = new URLSearchParams(params).toString();
//     const options = {
//       headers: {
//         accept: "image/jpeg",
//         Authorization: "Bearer " + props.token,
//       },
//     };

//     fetch(url, options)
//       .then((res) => res.blob())
//       .then((blob) => {
//         setDownloadedNicPhoto(URL.createObjectURL(blob));
//         console.log("downloaded photo: " + downloadedNicPhoto.slice(5));
//       });
//   }, [props.requestID]);
//   return <img src={downloadedNicPhoto} />;
// };

// export default DownloadedNicPhoto;

import { useEffect, useState } from "react";
import { nicImageAPI } from "../data/api";

const DownloadedNicPhoto = (props: { requestID: string; token: string }) => {
  const [downloadedNicPhoto, setDownloadedNicPhoto] = useState("");

  useEffect(() => {
    const localStorageKey = `${props.requestID}.jpg`;

    // Function to save image as Base64 in Local Storage
    const saveImageToLocalStorage = (blob: Blob, key: string) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        if (base64data) {
          localStorage.setItem(key, base64data.toString());
        }
      };
    };

    // Check if the image is in local storage
    const imageFromStorage = localStorage.getItem(localStorageKey);

    if (imageFromStorage) {
      setDownloadedNicPhoto(imageFromStorage);
    } else {
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
          // Save image to local storage as Base64
          saveImageToLocalStorage(blob, localStorageKey);

          // Set image for rendering
          const objectURL = URL.createObjectURL(blob);
          setDownloadedNicPhoto(objectURL);
        });
    }
  }, [props.requestID, props.token]);

  return <img src={downloadedNicPhoto} alt="Downloaded NIC Photo" />;
};

export default DownloadedNicPhoto;
