import React from "react";
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from "react-navigation";
import { ActivityIndicator, AsyncStorage } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class AuthLoadingContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.checkAuthentication();
  }

  checkAuthentication = async () => {
    try {
      const uuid = await AsyncStorage.getItem("jwt");
      this.props.navigation.navigate(uuid ? "Main" : "Auth");
    } catch (_) {
      this.props.navigation.navigate("Auth");
    }
  };

  render() {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }
}