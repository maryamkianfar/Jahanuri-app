import React from "react";
import styled from "styled-components/native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from "react-navigation";
import { useQuery } from "react-apollo-hooks";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import { ActivityIndicator, Linking } from "react-native";

import Divider from "../../components/Divider";
import FormikInput from "../../components/Formik/FormikInput";
import dimensions from "../../constants/dimensions";
import MenuCustomHeader from "../../components/MenuCustomHeader";
import CheckBoxRow from "../../components/CheckBoxRow";
import { GET_SURVEY_DETAIL } from "./SurveyDetailScreenQueries";
import { GetSurveyDetail, GetSurveyDetailVariables } from "../../types/api";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const View = styled.View`
  width: 90%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  font-weight: 100;
  line-height: 20px;
`;
const Box = styled.View`
  width: 100%;
  padding: 0 15px;
`;
const Line = styled.View`
  width: ${dimensions.width - 30};
  flex-direction: row;
  border-bottom-width: 1px;
  opacity: 0.4;
  margin: 20px;
`;
const SmallWhiteSpace = styled.View`
  height: 10px;
`;
const WhiteSpace = styled.View`
  height: 30px;
`;
const Link = styled(Text)`
  font-weight: 400;
  color: #8b00ff;
`;
const Touchable = styled.TouchableOpacity``;

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SurveyDetailScreen: React.FC<IProps> = ({ navigation }) => {
  const {
    data: { getSurveyDetail: { survey = null } = {} } = {},
    loading: getSurveyLoading,
  } = useQuery<GetSurveyDetail, GetSurveyDetailVariables>(GET_SURVEY_DETAIL, {
    variables: { surveyUuid: navigation?.state?.params?.surveyUuid },
  });
  const onPress = (urls: string) => {
    Linking.canOpenURL(urls)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(urls);
        } else {
          return null;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  if (getSurveyLoading) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  } else {
    return (
      <>
        <MenuCustomHeader title={"설문지"} subTitle={"(제출 완료)"} />
        <KeyboardAwareScrollView
          enableOnAndroid
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: null,
            alignItems: "center",
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <Formik initialValues={{}} onSubmit={() => {}}>
            {({ setFieldValue, setFieldTouched }) => (
              <>
                <SmallWhiteSpace />
                <Divider text={"결혼 여부"} color={"dark"} />
                <Box>
                  {survey.hasMarried ? (
                    <CheckBoxRow checked={true} text={"기혼"} />
                  ) : (
                    <CheckBoxRow text={"기혼"} />
                  )}
                  {!survey.hasMarried ? (
                    <CheckBoxRow checked={true} text={"미혼"} />
                  ) : (
                    <CheckBoxRow text={"미혼"} />
                  )}
                  {survey.hasMarriedEtc.length !== 0 && (
                    <FormikInput
                      label="기타"
                      value={survey.hasMarriedEtc}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="hasMarriedEtc"
                      placeholder="기타"
                    />
                  )}
                </Box>
                <Divider text={"출산 여부"} color={"dark"} />
                <Box>
                  {survey.hasChildbirth ? (
                    <CheckBoxRow checked={true} text={"있음"} />
                  ) : (
                    <CheckBoxRow text={"있음"} />
                  )}
                  {!survey.hasChildbirth ? (
                    <CheckBoxRow checked={true} text={"없음"} />
                  ) : (
                    <CheckBoxRow text={"없음"} />
                  )}
                  {survey.hasChildbirthEtc.length !== 0 && (
                    <FormikInput
                      label="기타 / 자녀가 있다면 자녀는 몇 분인가요?"
                      value={survey.hasChildbirthEtc}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="hasChildbirthEtc"
                      placeholder="기타 / 자녀가 있다면 자녀는 몇 분인가요?"
                    />
                  )}
                </Box>
                <Line />
                <FormikInput
                  editable={false}
                  label="자신의 현재 상태, 수술 및 진단이력"
                  value={survey.status}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="status"
                  placeholder="자신의 현재 상태, 수술 및 진단이력"
                />
                <View>
                  <Box>
                    <Text>
                      수술 및 병력, 진단받은 증상, 복용중인 약, 혹은 현재 가지고
                      있는 몸과 마음의 문제가 있다면 상세히 적어주세요. 작은
                      수술이나 병력까지 적어주시면 도움이 됩니다. (제왕절개도
                      포함합니다.)
                    </Text>
                  </Box>
                </View>
                <WhiteSpace />
                <FormikInput
                  editable={false}
                  label="본 프로그램을 통해 얻고 싶은 변화는 무엇인가요?"
                  value={survey.change}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="change"
                  placeholder="본 프로그램을 통해 얻고 싶은 '변화'는 무엇인가요?"
                />
                <View>
                  <Box>
                    <Text>
                      본 프로그램에 기대하는 점에 대해 적어주세요. 자신이 바꾸고
                      싶은 생활습관, 고치고 싶은 성격, 개선하려는 몸과 마음의
                      증상 등 상세히 적어주세요. 개인별 운동 프로그램과
                      영양키트를 구성하는 데 반영됩니다. 예) 각종 불편한 증상,
                      체력회복, 다이어트(특정부위), 고치고 싶은 생활습관(폭식,
                      지각 등 구체적으로), 기초체력, 생각의 변화, 성격 등
                    </Text>
                  </Box>
                </View>
                <SmallWhiteSpace />
                <Divider text={"개인정보 수집 및 이용 동의"} color={"dark"} />
                <View>
                  <Box>
                    <Text>
                      1) 수집이용목적: 프로그램 진행기간동안, 혹은 그 이후에
                      상담 및 관리 2) 수집항목: 이름, 전화번호, 주소, 직업, 건강
                      3) 이용 보유기간: 기입일시 이후 영구보관 (요청시 파기) 4)
                      거부권 및 불이익 사항: 개인정보제공이 되지 않을 경우
                      원활한 프로그램 진행 및 상담이 이루어지기 어렵습니다. 5)
                      기입하신 정보는 외부에 절대 유출되지 않는 점 미리
                      안내드립니다.
                    </Text>
                  </Box>
                </View>
                <Box>
                  {survey.agreePersonalInformation ? (
                    <CheckBoxRow checked={true} text={"동의합니다."} />
                  ) : (
                    <CheckBoxRow text={"동의합니다."} />
                  )}
                  {!survey.agreePersonalInformation ? (
                    <CheckBoxRow checked={true} text={"동의하지 않습니다."} />
                  ) : (
                    <CheckBoxRow text={"동의하지 않습니다."} />
                  )}
                </Box>
                <Divider text={"유의사항"} color={"dark"} />
                <View>
                  <Box>
                    <Text>1) 5분전까지 강의실에 입장해주세요.</Text>
                    <SmallWhiteSpace />
                    <Text>2) 준비물: 필기구, 운동 가능한 편한 복장</Text>
                    <SmallWhiteSpace />
                    <Text>
                      3) 책 (치유본능), (짠맛의 힘)을 읽고 참여하시면 몸공부에
                      큰 도움이 됩니다.
                    </Text>
                    <SmallWhiteSpace />
                    <Text>
                      4) 자하누리 카페 가입: 강의자료, 운동 동영상 제공, 과제
                      확인
                    </Text>
                    <Touchable
                      onPress={() => onPress("https://cafe.naver.com/jahanuri")}
                    >
                      <Link>https://cafe.naver.com/jahanuri</Link>
                    </Touchable>
                    <SmallWhiteSpace />
                    <Text>
                      5) 자하누리 카카오톡 플러스친구 추가: 문의, 공지 등을 위해
                      꼭 친구추가를 해주세요.
                    </Text>
                    <Touchable
                      onPress={() => onPress("http://pf.kakao.com/_ucnLV")}
                    >
                      <Link>http://pf.kakao.com/_ucnLV</Link>
                    </Touchable>
                    <SmallWhiteSpace />
                    <Text>
                      6) 수강료: 첫 온라인 특가 45만원 (신청서 제출 후 3일내
                      결제하셔야 신청이 완료됩니다.)
                    </Text>
                    <SmallWhiteSpace />
                    <Text>
                      7) 환불규정: 강의 시작 후에는 환불 불가. 이월 가능합니다.
                      - 2회 이상 결석시 수료증이 수여되지 않습니다.
                    </Text>
                  </Box>
                </View>
                <WhiteSpace />
                <WhiteSpace />
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </>
    );
  }
};
export default SurveyDetailScreen;
