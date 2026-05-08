export interface tableData {
  id: number;
  applicationNo: string;
  appliedSa: string;
  annualPremium: number;
  productType: string;
  drc: string;
  ptlr: string;
  isMedical: string;
  breDecision:string;
  channel:string;
  munichReMedicalDecision:string;
  hniFlag:string;
  roleType:string;
  poolTAT?: string;
  dateAndTimeStamp?: string;
}

const BASE_URL = "http://localhost:3001";

export const getData = async (): Promise<tableData[]> => {
  const res = await fetch(`${BASE_URL}/data`);
  return res.json();
};

export const getUdsDocuments = async (applicationNo: string, ntid: string) => {
  const res = await fetch(
    `http://localhost:3002/data/${applicationNo}`,
    {
      method: "GET",
      headers: {
        ntid: ntid,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();

  return { url: data.url };
};