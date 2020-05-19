import gql from "graphql-tag";

export const GET_REPORT_LIST = gql`
  query GetReportList($classOrderId: String, $userUuid: String) {
    getReportList(classOrderId: $classOrderId, userUuid: $userUuid) {
      reports {
        uuid
        reportDate
        reportCover {
          classOrder {
            order
            startDate
            endDate
          }
          uuid
          reportType
        }
      }
    }
  }
`;
