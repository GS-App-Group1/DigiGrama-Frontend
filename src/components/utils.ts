import axios from "axios";

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getToken = async (key: string): Promise<TokenResponse> => {
  try {
    const response = await axios.post(
      "https://api.asgardeo.io/t/interns/oauth2/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: key,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data as TokenResponse;
  } catch (error) {
    // Handle errors
    console.error("Error fetching token:", error);
    throw error;
  }
};