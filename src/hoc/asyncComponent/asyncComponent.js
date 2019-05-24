import React, { Component } from "react";

const asyncComponent = importComponent => {
  return class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponent().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      return this.state.component ? (
        <this.state.component {...this.props} />
      ) : null;
    }
  };
};

export default asyncComponent;
