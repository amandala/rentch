import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";

import styles from "./index.module.scss";

type PropsType = {
  children: React.ReactNode | string,
  href: string,
  className?: string
};

const MyLink = ({ className = "", children, href, ...rest }: PropsType) => (
  <Link className={styles.Wrapper} to={href}>
    <span className={cx(styles.Link, className)} {...rest}>
      {children}
    </span>
  </Link>
);

export default MyLink;

export const AnchorLink = ({
  className = "",
  children,
  href,
  ...rest
}: PropsType) => (
  <a className={styles.Wrapper} target="_blank" href={href}>
    <span className={cx(styles.Link, className)} {...rest}>
      {children}
    </span>
  </a>
);
