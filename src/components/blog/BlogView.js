import React, { Component } from "react";
import {
  View,
  Dimensions,
  Platform,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
} from "react-native";

import { WebView } from "react-native-webview";

export default class WebViewMoviezSpace extends Component {
  constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
    this.state = {
      canGoBack: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  handleBackButton = () => {
    if (this.state.canGoBack) {
      this.WEBVIEW_REF.current.goBack();
      return true;
    }
  };

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  }

  render() {
    return (
      <WebView
        style={styles.WebViewStyle}
        allowsFullscreenVideo={true}
        source={{ uri: this.props.route.params.uri }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        ref={this.WEBVIEW_REF}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        renderLoading={() => (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#e91e63" />
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: Platform.OS === "ios" ? 25 : 25,
  },
  spinnerContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#29252b",
    alignItems: "center",
    justifyContent: "center",
  },
});
