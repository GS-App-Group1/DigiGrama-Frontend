const IdentityURL =
  "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/hbld/identityapi-ztt/identityapi-b3c/v1";

const addressURL =
  "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/hbld/addressapi-kkw/addressapi-ac2/v1";

const policeURL =
  "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/hbld/policeapi/policeapi-e18/v1";

const mainURL =
  "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/hbld/mainservice-tcf/mainapi-bf2/v1";

export const identityAPI = {
  urls: {
    getIdentity: `${IdentityURL}/getIdentityFromNIC/`,
    getGS: `${IdentityURL}/getGSDivisionFromNIC/`,
  },
};

export const addressAPI = {
  urls: {
    getAddress: `${addressURL}/getAddressByNIC/`,
  },
};

export const policeAPI = {
  urls: {
    getCrimes: `${policeURL}/getPoliceRecordFromNIC/`,
  },
};

export const nicImageAPI = {
  urls: {
    upload:
      "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/hbld/nicimageapi-nzr/nicimagesapi-50f/v1/upload",
    download:
      "https://cf3a4176-54c9-4547-bcd6-c6fe400ad0d8-dev.e1-us-east-azure.choreoapis.dev/hbld/nicimageapi-nzr/nicimagesapi-50f/v1/download",
  },
  key: "Basic d0o3cl9hVHZFVkFWTXFXMEhtZ3ZuaDF4REs0YTppRkR4WTVFVnA3b2hObU9RY0pqNEVwX1c5aXRiX1Y4dHl6U1V4ZUdqUmJjYQ==",
};

export const mainAPI = {
  urls: {
    updateStatus: `${mainURL}/updateRequestStatus`,
    getUserRequests: `${mainURL}/getUserRequests`,
    updateRequest: `${mainURL}/updateUserRequest`,
    postRequest: `${mainURL}/userRequest`,
    updateGsNote: `${mainURL}/updateGSRequest`,
    getRequestForNIC: `${mainURL}/getUserRequestForNIC`,
  },
};
