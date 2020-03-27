import React from "react";

class AppError extends Error {
  title;
  subtitle;

  constructor(title, subtitle) {
    super(`${title}: ${subtitle}`);
    this.name = "AppError";
    this.title = title;
    this.subtitle = subtitle || "";
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, title: "", subtitle: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(error);

    if (error instanceof AppError) {
      this.setState({
        hasError: true,
        title: error.title,
        subtitle: error.subtitle
      });
    } else {
      this.setState({
        hasError: true,
        title: "An internal error occurred",
        subtitle: error.message
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.renderError(this.state.title, this.state.subtitle);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
