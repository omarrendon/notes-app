import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "dv34psubp",
  api_key: "265959147595176",
  api_secret: "Rr9t-qpk3N9TIcrxWHWmYRYJaxk",
  secure: true,
});

describe("Tests in fileUpload function", () => {
  test("should upload the image to cloudinry succesfully ", async () => {
    const imageUrl =
      "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.webp?b=1&s=612x612&w=0&k=20&c=81f5HaMtoPNUrdfa4hnS8NcwEgD9tH2nnTUBu25Msug=";
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const file = new File([blob], "photo.png");
    const { secure_url } = await fileUpload(file);

    expect(typeof secure_url).toBe("string");

    const segments = secure_url.split("/");
    const imageID = segments[segments.length - 1].replace(".webp", "");
    const folderName = "journal-app";

    const { result } = await cloudinary.uploader.destroy(
      `${folderName}/${imageID}`
    );

    expect(result).toEqual("ok");
  });

  test("should return null is the image doesn't exist", async () => {
    const file = new File([], "photo.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
