import axios from "axios";

const AxiosHelper = async (
  url: string,
  data: any = {},
  method: string = "get"
) => {
  if (!url || !method) {
    console.log("Can't make API call without URL and method");
    return;
  }

  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const config = {
    method: method.toLowerCase(),
    url: url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
    data: method.toLowerCase() === "get" ? undefined : formData,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error from axios:", error);
    throw error;
  }
};

export default AxiosHelper;
