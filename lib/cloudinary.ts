import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

export function getCloudinary() {
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    isConfigured = true;
  }

  return cloudinary;
}

export function isCloudinaryUrl(url: string) {
  try {
    return new URL(url).hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
}
