import { env as private_env } from "$env/dynamic/private";
import { PUBLIC_CLOUD_NAME, PUBLIC_CLOUD_APIKEY } from "$env/static/public"
import { v2 as cloud } from 'cloudinary'
export const cloudinary = cloud

cloudinary.config({ 
    cloud_name: PUBLIC_CLOUD_NAME, 
    api_key: PUBLIC_CLOUD_APIKEY, 
    api_secret: private_env.CLOUD_SECRET 
  });