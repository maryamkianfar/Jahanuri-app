import React from "react";
import { Paragraph, Caption, Headline } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { MEDIA_URL } from "../constants/urls";
import styled from "styled-components";

const UserInfoContainer = styled.View`
  align-items: center;
  margin: 5px 0;
  background-color: #fff;
`;

interface IProps {
  userImg?: string;
  name: string;
  username: string;
  bio?: string;
}

const MyProfileHeader: React.FC<IProps> = ({
  userImg = null,
  name,
  username,
  bio = "",
}) => {
  return (
    <UserInfoContainer>
      <Avatar
        size="large"
        rounded
        containerStyle={{ marginVertical: 5 }}
        source={{
          uri: userImg
            ? MEDIA_URL + userImg
            : "https://gblobscdn.gitbook.com/spaces%2F-L-nWFFFG5HNhz4YeOI_%2Favatar.png?generation=1523478414663564&alt=media",
        }}
      />
      <Headline>{name}</Headline>
      <Caption>{`@${username}`}</Caption>
      <Paragraph>{bio}</Paragraph>
    </UserInfoContainer>
  );
};

export default MyProfileHeader;