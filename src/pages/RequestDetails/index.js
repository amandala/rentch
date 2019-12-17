import React, { useState, useEffect } from "react";
import { useModal } from "react-modal-hook";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
import { Form, TextArea, useFormState, Select, Option } from "informed";
import { Query, ContentfulClient, ContentfulProvider } from "react-contentful";
import {
  Text,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall
} from "../../components/Heading";
import Pill from "../../components/Pill";
import Notification from "./Notification";

import { useStateValue } from "../../StateProvider";

import styles from "./index.module.scss";

import { validate } from "../../helpers/validation";

import TenantResponseForm from "./TenantResponseForm";
import ManagerResponseForm from "./ManagerResponseForm";

import { getFormattedDate } from "../../helpers/getFormattedDate";
import { isTenant } from "../../helpers/isTenant";

const renderResponseForm = (request, userEmail) => {
  if (
    isTenant({
      userEmail,
      tenant: request.fields.property.fields.tenant[0]
    })
  ) {
    return <TenantResponseForm request={request} />;
  } else return <ManagerResponseForm request={request} />;
};

const RequestDetails = props => {
  const [{ userData }] = useStateValue();

  const contentfulClient = new ContentfulClient({
    accessToken: process.env.REACT_APP_CONTENT_DELIVERY_API,
    space: process.env.REACT_APP_CONTENTFUL_SPACE
  });

  return (
    <ContentfulProvider client={contentfulClient}>
      <Query
        contentType="request"
        include={4}
        query={{
          "sys.id": props.match.params.id
        }}
      >
        {({ data, error, fetched, loading }) => {
          if (loading || !fetched) {
            return null;
          }

          if (error) {
            console.error(error);
            return null;
          }

          if (!data.items.length || !data.items[0]) {
            return <p>No user data exists.</p>;
          }

          const request = data.items[0];

          const getRequestType = requestType => {
            switch (requestType) {
              case "appliance":
                return "Appliance repair";
              case "heat":
                return "Heat repair";
              case "plumbing":
                return "Plumbing repair";
              case "other":
                return "Miscellaneous";
            }
          };

          console.log(request);

          return (
            <div className={styles.Wrapper}>
              <Pill status={request.fields.status} />
              <HeadingXSmall className={styles.Date}>
                {getFormattedDate({ date: request.fields.timestamp })}
              </HeadingXSmall>
              <HeadingMedium className={styles.RequestTitle}>
                {`${getRequestType(request.fields.type)} request at ${request
                  .fields.property.fields.name}`}
              </HeadingMedium>

              <HeadingSmall className={styles.Details}>
                {request.fields.message}
              </HeadingSmall>
              <div>
                {request.fields.photos &&
                  request.fields.photos.map(photo => {
                    return <img src={photo.fields.file.url} />;
                  })}
              </div>
              <div>
                {request.fields.notifications &&
                  request.fields.notifications.length &&
                  request.fields.notifications.map(notificaiton => {
                    return (
                      notificaiton.fields &&
                      <Notification
                        date={notificaiton.fields.timestamp}
                        subject={notificaiton.fields.subject}
                        message={notificaiton.fields.message}
                      />
                    );
                  })}
              </div>
              <div className={styles.Form}>
                {renderResponseForm(request, userData.email)}
              </div>
            </div>
          );
        }}
      </Query>
    </ContentfulProvider>
  );
};

export default RequestDetails;
