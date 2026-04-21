import React from "react";
import "@/components/FaceRecognition/face_recognition.style.css";
import "@/App.css";
interface FaceRecognitionProps {
  imageUrl: string;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({ imageUrl }) => {
  return (
    <div className="face_recognition_container center">
      <img src={imageUrl} alt="delect_images" />
    </div>
  );
};

export default FaceRecognition;
