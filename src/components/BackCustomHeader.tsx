import React from "react";
import styled from "styled-components";
import { Header } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

const IconContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  width: 40px;
`;

interface IProps {
  title: string;
}

const BackArrow = withNavigation(({ navigation }) => {
  return (
    <IconContainer onPress={() => navigation.goBack(null)}>
      <Ionicons size={24} name={"ios-arrow-back"} />
    </IconContainer>
  );
});

const BackCustomHeader: React.FC<IProps> = ({ title }) => {
  return (
    <Header
      placement="left"
      leftComponent={<BackArrow />}
      containerStyle={{
        backgroundColor: "#ffffff",
        borderBottomColor: "#999",
        alignItems: "center",
        borderBottomWidth: 0.5,
      }}
      centerComponent={{ text: title, style: { alignItems: "center" } }}
      barStyle={"light-content"}
    />
  );
};

export default BackCustomHeader;