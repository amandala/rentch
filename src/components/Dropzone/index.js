import React, { useCallback } from "react";
import fs from "fs";
import Dropzone, { useDropzone } from "react-dropzone";
import { createClient } from "contentful-management";
import styles from "./index.module.scss";

const MyDropzone = () => {
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
            console.log("creating asset...");
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
                console.log("prcessing...");
                return asset.processForLocale("en-US", {
                  processingCheckWait: 2000
                });
              })
              .then(asset => {
                console.log("publishing...");
                return asset.publish();
              })
              .then(asset => {
                console.log(asset);
                return asset;
              });
          })
          .catch(err => {
            console.log(err);
          });
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
