export const fileUpload = async file => {
  if (!file) throw new Error("The file is missing");

  const URL = "https://api.cloudinary.com/v1_1/dv34psubp/upload";

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const response = await fetch(URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("The image could not be loaded");

    const imageResponse = await response.json();

    return imageResponse;
  } catch (error) {
    console.log("Error", error);
    throw new Error(error.message);
  }
};
