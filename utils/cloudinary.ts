import {v2 as cloudinary} from 'cloudinary'
import config from '../config/config';


cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
    secure: true
})


export async function uploadImage(filePath: string){
    return await cloudinary.uploader.upload(filePath, {
        folder: 'moviehub'
    })
}
export const deleteImage = async (imageId:string) => {

    return await cloudinary.uploader.destroy(imageId)

};