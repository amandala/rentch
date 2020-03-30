import React from "react";

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

    this.setState({
      hasError: true,
      title: error,
      subtitle: "APP_ERROR"
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.renderError(this.state.title, this.state.subtitle);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
