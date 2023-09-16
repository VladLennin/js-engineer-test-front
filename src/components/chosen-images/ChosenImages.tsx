import React, {FC} from 'react';

interface ChosenImagesProps {
    images: FileList
}

const ChosenImages: FC<ChosenImagesProps> = ({images}) => {
    let result = [];
    for (let i = 0; i < images.length; i++) {
        console.log(images[i])
    }
   return (
       <>
       </>
   )
};

export default ChosenImages;