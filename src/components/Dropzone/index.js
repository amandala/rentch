import React, { useCallback } from "react";
import fs from "fs";
import Dropzone, { useDropzone } from "react-dropzone";
import { createClient } from "contentful-management";
import styles from "./index.module.scss";

const MyDropzone = () => {
  const [uploadState, setUploadState] = React.useState(undefined);

  var client = createClient({
    accessToken: process.env.REACT_APP_CONTENT_MANAGEMENT_API
  });

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files

    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      console.log(file);
      const fileName = file.name;
      const contentType = file.type;

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        client
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
            client
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
                setUploadState("Success", asset.fields.title["en-US"]);
                return asset;
              });
          })
          .catch(err => {
            setUploadState("Error");
            console.log(err);
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

    if (acceptedFiles.length && uploadState && uploadState !== "Error") {
      return (
        <div>
          <ul>
            {acceptedFiles.map(asset => {
              return (
                <li>
                  uploading {asset.name}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return isDragActive
      ? <p>Drop those files here</p>
      : <p>Drag n drop your photos or click here to upload</p>;
  };

  return (
    <div {...getRootProps()} className={styles.Dropzone}>
      <input {...getInputProps()} />
      {renderContent()}
    </div>
  );
};

export default MyDropzone;
