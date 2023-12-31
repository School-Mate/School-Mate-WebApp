export interface SchoolInfoRow {
  /**
   * 시도교육청코드
   */
  ATPT_OFCDC_SC_CODE?: string;
  /**
   * 시도교육청명
   */
  ATPT_OFCDC_SC_NM?: string;
  /**
   * 표준학교코드
   */
  SD_SCHUL_CODE?: string;
  /**
   * 학교명
   */
  SCHUL_NM?: string;
  /**
   * 영문학교명
   */
  ENG_SCHUL_NM?: string;
  /**
   * 학교종류명
   */
  SCHUL_KND_SC_NM: string;
  /**
   * 소재지명
   */
  LCTN_SC_NM?: string;
  /**
   * 관할조직명
   */
  JU_ORG_NM?: string;
  /**
   * 설립명
   */
  FOND_SC_NM?: string;
  /**
   * 도로명우편번호
   */
  ORG_RDNZC?: string;
  /**
   * 도로명주소
   */
  ORG_RDNMA?: string;
  /**
   * 도로명상세주소
   */
  ORG_RDNDA?: string;
  /**
   * 전화번호
   */
  ORG_TELNO?: string;
  /**
   * 홈페이지주소
   */
  HMPG_ADRES?: string;
  /**
   * 남녀공학구분명
   */
  COEDU_SC_NM?: string;
  /**
   * 팩스번호
   */
  ORG_FAXNO?: string;
  /**
   * 고등학교구분명
   */
  HS_SC_NM?: string;
  /**
   * 산업체특별학급존재여부
   */
  INDST_SPECL_CCCCL_EXST_YN?: string;
  /**
   * 고등학교일반실업구분명
   */
  HS_GNRL_BUSNS_SC_NM?: string;
  /**
   * 특수목적고등학교계열명
   */
  SPCLY_PURPS_HS_ORD_NM?: string;
  /**
   * 입시전후기구분명
   */
  ENE_BFE_SEHF_SC_NM?: string;
  /**
   * 주야구분명
   */
  DGHT_SC_NM?: string;
  /**
   * 설립일자
   */
  FOND_YMD?: string;
  /**
   * 개교기념일
   */
  FOAS_MEMRD?: string;
  /**
   * 적재일시
   */
  LOAD_DTM?: string;
}

interface ClassInfoRow {
  /**
   * 시도교육청코드
   */
  ATPT_OFCDC_SC_CODE?: string;
  /**
   * 시도교육청명
   */
  ATPT_OFCDC_SC_NM?: string;
  /**
   * 표준학교코드
   */
  SD_SCHUL_CODE?: string;
  /**
   * 학교명
   */
  SCHUL_NM?: string;
  /**
   * 학년도
   */
  AY?: string;
  /**
   * 학년
   */
  GRADE?: string;
  /**
   * 주야과정명
   */
  DGHT_CRSE_SC_NM?: string;
  /**
   * 학교과정명
   */
  SCHUL_CRSE_SC_NM?: string;
  /**
   * 계열명
   */
  ORD_SC_NM?: string;
  /**
   * 학과명
   */
  DDDEP_NM?: string;
  /**
   * 반명
   */
  CLASS_NM?: string;
  /**
   * 적재일시
   */
  LOAD_DTM?: string;
}

interface ITimetableRow {
  /**
   * 시도교육청코드
   */
  ATPT_OFCDC_SC_CODE?: string;
  /**
   * 시도교육청명
   */
  ATPT_OFCDC_SC_NM?: string;
  /**
   * 표준학교코드
   */
  SD_SCHUL_CODE?: string;
  /**
   * 학교명
   */
  SCHUL_NM?: string;
  /**
   * 학년도
   */
  AY?: string;
  /**
   * 학기
   */
  SEM?: string;
  /**
   * 시간표일자
   */
  ALL_TI_YMD?: string;
  /**
   * 주야과정명
   */
  DGHT_CRSE_SC_NM?: string;
  /**
   * 학년
   */
  GRADE?: string;
  /**
   * 반명
   */
  CLASS_NM?: string;
  /**
   * 교시
   */
  PERIO?: string;
  /**
   * 수업내용
   */
  ITRT_CNTNT?: string;
  /**
   * 적재일시
   */
  LOAD_DTM?: string;
}

interface ITimeTableResponse {
  [0]: IResponseHead;
  [1]: { row: Array<ITimetableRow> };
}

interface ISpecialTimetableRow {
  /**
   * 시도교육청코드
   */
  ATPT_OFCDC_SC_CODE?: string;
  /**
   * 시도교육청명
   */
  ATPT_OFCDC_SC_NM?: string;
  /**
   * 표준학교코드
   */
  SD_SCHUL_CODE?: string;
  /**
   * 학교명
   */
  SCHUL_NM?: string;
  /**
   * 학년도
   */
  AY?: string;
  /**
   * 학기
   */
  SEM?: string;
  /**
   * 시간표일자
   */
  ALL_TI_YMD?: string;
  /**
   * 학교과정명
   */
  SCHUL_CRSE_SC_NM?: string;
  /**
   * 학년
   */
  GRADE?: string;
  /**
   * 강의실명
   */
  CLRM_NM?: string;
  /**
   * 반명
   */
  CLASS_NM?: string;
  /**
   * 교시
   */
  PERIO?: string;
  /**
   * 수업내용
   */
  ITRT_CNTNT?: string;
  /**
   * 적재일시
   */
  LOAD_DTM?: string;
}
