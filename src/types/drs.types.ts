export type Row = {
  details: string;
  decision: string;
  decisionCode: string;
};

export type RequirementRow = {
  reqtName: string;
  reqtCode: string;
  typeOfReqt: string;
  lifeAssuredOrProposer: string;
  status: string;
  raisedDate: string;
  receivedDate: string;
};

export type RiderRow = {
  riderName: string;
  riderOption: string;
  riderPT: number;
  riderSumAssured: number;
  riderModalPremium: number;
  riderPPT: number;
};

export type RiskCard = {
  title: string;
  desc: string;
  type: "medical" | "financial" | "other";
  status: "warning" | "success";
};

export type FirstUwDecisionRow = {
  details: string;
  decision: string;
  decisionCode: string;
};

export type FinalUwDecisionRow = {
  uwDecision: string;
  uwDecisionCode: string;
};

export type ApplicantInfoTab =
  | "personalKyc"
  | "contactAddress"
  | "financialProfession"
  | "medicalLifestyle"
  | "nominee"
  | "generic"
  | "eia";

export type DetailItem = {
  label: string;
  value: string;
};

export type FieldProps = {
  label: string;
  value: string;
};

export type SectionProps = {
  title: string;
  children: React.ReactNode;
  sx?: object;
};

export type Props = {
  commAddressDetails: DetailItem[];
  contactDetails: DetailItem[];
};
