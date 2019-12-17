import React, { useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

import styles from "./index.module.scss";

const MyDropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    console.log(acceptedFiles);

    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.Dropzone}>
      <input {...getInputProps()} />
      {isDragActive
        ? <p>Drop the files here ...</p>
        : <p>Drag 'n' drop some files here, or click to select files</p>}
    </div>
  );
};

export default MyDropzone;
