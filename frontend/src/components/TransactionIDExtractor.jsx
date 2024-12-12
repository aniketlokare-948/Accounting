import React, { useState } from "react";
import Tesseract from "tesseract.js";

const TransactionIDExtractor = () => {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);

      try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const blob = await response.blob();
        const processedImageUrl = URL.createObjectURL(blob);
        setProcessedImage(processedImageUrl);
      
        // OCR Processing
        Tesseract.recognize(blob, "eng")
          .then(({ data: { text } }) => {
            const id = extractTransactionId(text);
            setTransactionId(id || "");
            if (!id) alert("Transaction ID not found. Please enter manually.");
          })
          .catch((err) => console.error("OCR Error:", err));
      } catch (err) {
        console.error("Error during image processing:", err);
        alert("An error occurred while processing the image. Please try again.");
      } finally {
        setLoading(false);
      }
      
    }
  };

  const extractTransactionId = (text) => {
    const match = text.match(/TRANSACTION ID[:\- ]?\s?(\S+)/i);
    return match ? match[1] : null;
  };

  return (
    <div>
      <h1>Transaction ID Extractor</h1>
      <form>
        <div>
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        {image && <img src={image} alt="Uploaded" style={{ maxWidth: "300px" }} />}
        {processedImage && (
          <div>
            <h3>Processed Image:</h3>
            <img src={processedImage} alt="Processed" style={{ maxWidth: "300px" }} />
          </div>
        )}
        <div>
          <label>Transaction ID:</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter manually if needed"
          />
        </div>
        <button type="button" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransactionIDExtractor;
