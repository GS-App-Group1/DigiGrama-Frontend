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
  const [error, setError] = useState(""); // State to store any error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL(nicImageAPI.urls.download);
        const params = { requestID: props.requestID };
        url.search = new URLSearchParams(params).toString();

        const options = {
          headers: {
            accept: "image/jpeg",
            Authorization: "Bearer " + props.token,
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        setDownloadedNicPhoto(URL.createObjectURL(blob));
      } catch (err) {
        console.error("Failed to fetch image:", err);
        setError("Failed to download image. Please try again later.");
      }
    };

    fetchData();
  }, [props.requestID, props.token]);

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  return <img src={downloadedNicPhoto} alt="Downloaded NIC Photo" />;
};

export default DownloadedNicPhoto;
