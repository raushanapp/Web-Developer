import React from "react";
import "@/components/ImageLinkForm/image_link_form.style.css";

interface ImageLinkFormsProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const ImageLinkForm: React.FC<ImageLinkFormsProps> = ({
  onInputChange,
  onSubmit,
}) => {
  return (
    <div className="image_link_form_container">
      <p className="text_title">
        This Magic Brain will detect faces in your pictures. give it a try!
      </p>
      <div className="link_container">
        <input
          type="text"
          placeholder="Enter image URL"
          className="text_input"
          onChange={onInputChange}
        />
        <button className="btn" onClick={onSubmit}>
          Detect Faces
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
