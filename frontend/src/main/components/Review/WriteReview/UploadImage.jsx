import React from "react";
// import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";

function UploadImage(props) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        props.setImageList(imageList);
        setImages(imageList);
        console.log(typeof(imageList));
    };


    return (
        <div>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
                }) => (
                    <div>
                        <button
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                        >
                        Click or Drop here
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll}>Remove all images</button>
                        {imageList.map((image, index) => (
                            <div key={index}>
                                {/* {console.log(typeof(image.data_url))}
                                {console.log(image.data_url)} */}
                                <img src={image.data_url} alt="" width="100" />
                                <div>
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

export default UploadImage