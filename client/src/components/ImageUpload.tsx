import React, { useState } from 'react';
import { ReactComponent as Upload } from "../assets/upload.svg";
import globalStyles from '../globalStyles';

const ImageUpload = ({ title, initialImage, callback }: { title: string, initialImage?: string, callback?: Function }) => {

    const [base64Image, setBase64Image] = useState<string | ArrayBuffer>(initialImage ? initialImage : '');

    const onFileUploaded = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { target } = event;

        if (target.files && target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                const setImg = async () => {

                    if (e && e.target && e.target.result) {
                        await setBase64Image(e.target.result);
                        if (callback) {
                            callback(e.target.result);
                        }
                    }
                }
                setImg();
            };

            reader.readAsDataURL(target.files[0]);
        }
    }

    return (

        <div className="">

            <label htmlFor="file-input" className="flex flex-col items-center">

                <span className={`${globalStyles.textDefault} font-medium mb-4`}>{title}</span>

                {

                    base64Image ?
                        <form encType="multipart/form-data">
                            <img src={base64Image.toString()} alt="Product" title={title} className={`${globalStyles.imageUpload}`} />
                        </form> :

                        <Upload title={title} className={`${globalStyles.imageUpload}`} />
                }
            </label>

            <input type="file" accept="image/jpeg, image/png" name="image" id="file-input" onChange={onFileUploaded}
                className='hidden' />
        </div>
    );
}


export default ImageUpload;