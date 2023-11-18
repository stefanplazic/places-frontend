import axios from "axios";

const apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/place`;

export const getAll = async () => {
  try {
    const response = await axios.get(apiUrl);

    return response.data.data.places;
  } catch (error) {
    throw new Error(`Error fetching all places: ${error.message}`);
  }
};

export const getOne = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);

    return response.data.data;
  } catch (error) {
    throw new Error(
      `Error fetching info about single place with id: ${id}: ${error.message}`
    );
  }
};

export const search = async (term: string) => {
  try {
    const response = await axios.get(`${apiUrl}/search/${term}`);

    return response.data.data.places;
  } catch (error) {
    throw new Error(
      `Error fetching info about search result for search term: ${term}: ${error.message}`
    );
  }
};
