import axios from "axios";

const AxiosHelper = async (url: string, data = {}, method = "get") => {
  if (!url || !method) {
    console.log("Can't make API call without URL and method");
    return;
  }

  const config = {
    method: method.toLowerCase(),
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    data: method.toLowerCase() === "get" ? undefined : data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error from axios:");
    throw error;
  }
};

export default AxiosHelper;
