import Head from 'next/head';
import styles from '../styles/Home.module.css';

import * as tf from '@tensorflow/tfjs';
// const human = require('@vladmandic/human');
import human from '@vladmandic/human'

export default function Home() {
  
  async function getEmbedding() {
    const uploadedImage = document.getElementById('uploadedImage');
    console.log("uploadedImage",uploadedImage)
    // Load a pre-trained model for image classification (e.g., MobileNet)
    const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
  
    // Process the uploaded image
    const image = tf.browser.fromPixels(uploadedImage);
    const processedImage = tf.image.resizeBilinear(image, [224, 224]).toFloat().expandDims();
  
    // Get the embeddings
    const embeddings = model.predict(processedImage);
  
    // Convert embeddings to a 1D array
    const embeddingArray = embeddings.dataSync();
  
    // Now you have the 128-dimensional embedding vector
    console.log('Embedding:', embeddingArray);
    
  
    // document.getElementById('encodData').innerHTML = embeddingArray
    // Close the modal
    // closeModal();
  }
  async function handleImageUpload(event) {
    const uploadedImage = document.getElementById('uploadedImage');
    uploadedImage.style.display = 'block';
    console.log("ebven",event.target.files[0])
    uploadedImage.src = URL.createObjectURL(event.target.files[0]);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="myModal" className="modal">
  <div className="modal-content">
    <span className="close">&times;</span>
    <input type="file" id="imageInput" accept="image/*" onChange={(event)=>handleImageUpload(event)}/>
    <img id="uploadedImage" src="#" alt="Uploaded Image"/>
    <button onClick={()=>getEmbedding()}>Get Embedding</button>
    {/* <p id='encodData'></p> */}
  </div>
</div>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
