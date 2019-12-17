import React, { useCallback } from "react";
import { createClient } from "contentful-management";
import Dropzone, { useDropzone } from "react-dropzone";
import fs from "fs";

import { useStateValue } from "../../StateProvider";

import styles from "./index.module.scss";

const processFile = (file, setUploadState) => {
  const fileName = file.name;
  const contentType = file.type;

  const client = createClient({
    accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
  });

  return client
    .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
    .then(space => {
      return space.createUpload({
        file: file,
        contentType,
        fileName
      });
    })
    .then(upload => {
      setUploadState("Uploading files");
      console.log("creating asset...", upload);
      return client
        .getSpace(process.env.REACT_APP_CONTENTFUL_SPACE)
        .then(space => {
          return space.createAsset({
            fields: {
              title: {
                "en-US": fileName
              },
              file: {
                "en-US": {
                  fileName: fileName,
                  contentType: contentType,
                  uploadFrom: {
                    sys: {
                      type: "Link",
                      linkType: "Upload",
                      id: upload.sys.id
                    }
                  }
                }
              }
            }
          });
        })
        .then(asset => {
          console.log("Processing");
          setUploadState("Processing");
          return asset.processForLocale("en-US", {
            processingCheckWait: 2000
          });
        })
        .then(asset => {
          console.log("Publishing");
          setUploadState("Publishing");

          return asset.publish();
        })
        .then(asset => {
          console.log("ASSET", asset);

          setUploadState("Success", asset.fields.title["en-US"]);
          return asset;
        });
    })
    .catch(err => {
      setUploadState("Error");
      console.log(err);
    });
};

const MyDropzone = () => {
  const [{ uploads }, dispatch] = useStateValue();

  const [uploadState, setUploadState] = React.useState(undefined);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files

    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      console.log(file);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        processFile(file, setUploadState).then(result => {
          console.log("RESULT", result);
          dispatch({
            type: "UPLOAD_SUCCESS",
            data: {
              name: result.fields.title["en-US"],
              id: result.sys.id
            }
          });
        });
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles
  } = useDropzone({ onDrop });

  const renderContent = () => {
    if (uploadState && uploadState !== "Success") {
      return (
        <p>
          {uploadState}
        </p>
      );
    }

    if (isDragActive) {
      return <p>Drop those files here</p>;
    }

    return <p>Drag n drop your photos or click here to upload</p>;
  };

  return (
    <div {...getRootProps()} className={styles.Dropzone}>
      <input {...getInputProps()} />
      {renderContent()}
      {uploads.map(asset =>
        <span className={styles.Upload}>
          <span className={styles.Check}>&#10003;</span>
          {asset.name}
        </span>
      )}
    </div>
  );
};

export default MyDropzone;
