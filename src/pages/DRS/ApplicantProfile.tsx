import { Box, Divider, Typography } from "@mui/material";
import CustomAccordion from "../../component/ui/Accordion/Accordion";
import { useState } from "react";
import UserPhoto from "../../assets/user-photo.svg";
import { columnFlex } from "../../utils/styles";
import Badge from "../../component/ui/Badge/Badge";
import CustomDialog from "../../component/ui/Dialog/Dialog";
import {
  PhoneIcon,
  SmsIcon,
  WalletIcon,
  BriefcaseIcon,
} from "../../icons/Icons";
import CustomTabs from "../../component/ui/Tabs/Tabs";
import type { ApplicantInfoTab, FieldProps, Props, SectionProps } from "../../types/drs.types";
import { GridSection } from "../../component/layout/GridSection";
import KeyValueTable from "../../component/ui/KeyValueTable/KeyValueTable";
import { toMap } from "../../utils/helpers";

const profileHighlights = [
  {
    icon: BriefcaseIcon,
    label: "Occupation",
    value: "Salaried",
  },
  {
    icon: WalletIcon,
    label: "Annual Income",
    value: "50,00,000",
  },
  {
    icon: SmsIcon,
    label: "Email",
    value: "test@ipru.com",
  },
  {
    icon: PhoneIcon,
    label: "Mobile",
    value: "+91 9898989898",
  },
];

const applicantInfoTabs: { key: ApplicantInfoTab; label: string }[] = [
  { key: "personalKyc", label: "Personal & KYC" },
  { key: "contactAddress", label: "Contact & Address" },
  { key: "financialProfession", label: "Financial & Profession" },
  { key: "medicalLifestyle", label: "Medical & Lifestyle" },
  { key: "nominee", label: "Nominee" },
  { key: "generic", label: "Generic" },
  { key: "eia", label: "eIA" },
];

const personalDetails = [
  { label: "Date of Birth", value: "02/01/1995" },
  { label: "Gender", value: "Male" },
  { label: "Marital Status", value: "Married" },
  { label: "Nationality", value: "Indian" },
  { label: "Country of Residence", value: "India" },
  { label: "Education", value: "Post Graduate" },
];

const kycDetails = [
  { label: "PAN Number / Form 60", value: "******7654E" },
  { label: "Identity Proof Type", value: "Aadhaar Card" },
  { label: "Identity Proof Number", value: "********5467" },
  { label: "Address Proof", value: "Aadhaar Card" },
  { label: "Income Proof", value: "Form 16" },
  { label: "Existing CKYC Number", value: "NA" },
  { label: "Politically Exposed Person (PEP)", value: "No" },
  { label: "Criminal Proceedings", value: "No" },
];

const commAddressDetails = [
  { label: "Address Line 1", value: "PRISM Towers" },
  { label: "Address Line 2", value: "Malad west" },
  { label: "Landmark", value: "Behind Inorbit Mall" },
  { label: "City", value: "Mumbai" },
  { label: "State", value: "Maharashtra" },
  { label: "Country of Residence", value: "India" },
  { label: "Pincode", value: "400064" },
];

const contactDetails = [
  { label: "Mobile No.", value: "9898989898" },
  { label: "Email ID", value: "test@ipru.com" },
  { label: "Country Code", value: "91" },
  { label: "Alternate Mobile", value: "-" },
  { label: "Landline Number", value: "" },
  { label: "STD/ISD Code", value: "22" },
];

const financialDetails = [
  { label: "Annual Income", value: "500000" },
  { label: "GSTIN", value: "-" },
  { label: "Organisation Type", value: "Public" },
  { label: "Organisation Name", value: "ICICI Bank" },
];

const healthInformationRows = [
  {
    leftLabel: "Height",
    leftValue: "170 Cms",
    rightLabel: "Neurological Disorder",
    rightValue: "No",
  },
  {
    leftLabel: "Weight",
    leftValue: "70 Kgs",
    rightLabel: "Mental Disorder",
    rightValue: "No",
  },
  {
    leftLabel: "Diabetes",
    leftValue: "No",
    rightLabel: "HIV/AIDS",
    rightValue: "No",
  },
  {
    leftLabel: "Hypertension",
    leftValue: "No",
    rightLabel: "Any Surgery",
    rightValue: "No",
  },
  {
    leftLabel: "Heart Disease",
    leftValue: "No",
    rightLabel: "Hospitalization",
    rightValue: "No",
  },
  {
    leftLabel: "Cancer",
    leftValue: "No",
    rightLabel: "Other Illness",
    rightValue: "No",
  },
  {
    leftLabel: "Kidney Disease",
    leftValue: "No",
    rightLabel: "Family Heart Disease",
    rightValue: "No",
  },
  {
    leftLabel: "Liver Disease",
    leftValue: "No",
    rightLabel: "Family Cancer",
    rightValue: "No",
  },
  {
    leftLabel: "Lung Disease",
    leftValue: "No",
    rightLabel: "Family Diabetes",
    rightValue: "No",
  },
];

const LifestyleHabitsRows = [
  {
    leftLabel: "Alcohol Consumption",
    leftValue: "No",
    rightLabel: "Hazardous Occupation",
    rightValue: "No",
  },
  {
    leftLabel: "Alcohol Quantity",
    leftValue: "-",
    rightLabel: "Aviation Activities",
    rightValue: "No",
  },
  {
    leftLabel: "Smoking",
    leftValue: "No",
    rightLabel: "Diving",
    rightValue: "No",
  },
  {
    leftLabel: "Smoking Quantity",
    leftValue: "-",
    rightLabel: "Mountaineering",
    rightValue: "No",
  },
  {
    leftLabel: "Tobacco/Gut",
    leftValue: "No",
    rightLabel: "Tobacco/Gut",
    rightValue: "No",
  },
  {
    leftLabel: "Narcotics",
    leftValue: "No",
    rightLabel: "Other Hazardous Activities",
    rightValue: "No",
  },
];

const nomineeDetails = [
  { label: "Nominee Name", value: "Tanaya" },
  { label: "Nominee DOB", value: "21/02/1996" },
  { label: "Gender", value: "Female" },
  { label: "Relationship", value: "Spouse" },
  { label: "Account Number", value: "1234AW" },
  { label: "IFSC", value: "ICIC231400" },
  { label: "Share %", value: "100" },
  { label: "Appointee Name", value: "NA" },
  { label: "Appointee Gender", value: "NA" },
  { label: "DOB", value: "NA" },
];

const eiaDetails = [
  { label: "Open eIA", value: "No" },
  { label: "Existing eIA Number", value: "NA" },
  { label: "Preferred Repository", value: "CDSL" },
  { label: "Convert Policies", value: "No" },
];

const genericDetails = [
  { label: "Existing Policy Number", value: "NA" },
  { label: "Client ID", value: "NA" },
  { label: "Self Proposed", value: "Yes" },
  { label: "Type of Proposer", value: "Individual" },
  { label: "Relationship with Life Assured", value: "Self" },
  { label: "Type of Proposal", value: "Individual" },
];

const PersonalKYC = () => (
  <Box
    sx={{
      p: 2,
      mt: 2,
      boxShadow: 1,
      borderRadius: 2,
      backgroundColor: "#F6F6F6",
    }}
  >
    <GridSection columns={3} items={personalDetails} />

    <Divider sx={{ marginY: "20px", bgcolor: "#737373" }} />

    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Typography
        component="span"
        sx={{
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        KYC
      </Typography>
    </Box>
    <Box sx={{ marginY: 1 }} />
    <GridSection columns={4} items={kycDetails} />
  </Box>
);

const Field: React.FC<FieldProps> = ({ label, value }) => (
  <Box>
    <Typography sx={{ color: "#444", fontSize: 14 }}>
      {label}
    </Typography>
    <Typography sx={{ color: "#161616", fontWeight: 600, fontSize: 16 }}>
      {value || "-"}
    </Typography>
  </Box>
);

const Section: React.FC<SectionProps> = ({ title, children, sx }) => (
  <Box
    sx={{
      backgroundColor: "#f6f6f6",
      borderRadius: 2,
      padding: 2.5,
      ...sx,
    }}
  >
    <Typography sx={{ fontWeight: 700, mb: 2 }}>{title}</Typography>
    {children}
  </Box>
);

const ContactAndAddress: React.FC<Props> = ({
  commAddressDetails,
  contactDetails,
}) => {
  const commMap = toMap(commAddressDetails);
  const contactMap = toMap(contactDetails);

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
        }}
      >
        {/* Communication Address */}
        <Section title="Communication Address">
          <Box sx={{ mb: 2.5 }}>
            <Field label="Address Line 1" value={commMap["Address Line 1"]} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              mb: 2.5,
            }}
          >
            <Field label="Address Line 2" value={commMap["Address Line 2"]} />
            <Field label="Landmark" value={commMap["Landmark"]} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            <Field label="City" value={commMap["City"]} />
            <Field label="State" value={commMap["State"]} />
            <Field label="Pincode" value={commMap["Pincode"]} />
          </Box>
        </Section>

        {/* Permanent Address */}
        <Section title="Permanent Address">
          <Badge
            label="Same as Communication Address"
            variant="Neutral"
            size="medium"
          />
        </Section>
      </Box>

      {/* Contact Details */}
      <Section title="Contact Details" sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
          }}
        >
          <Field
            label="Mobile No."
            value={`+91 ${contactMap["Mobile No."] || "-"}`}
          />
          <Field
            label="Email Id"
            value={contactMap["Email ID"]}
          />
          <Field
            label="Alternate Mobile"
            value={contactMap["Alternate Mobile"]}
          />
          <Field
            label="Landline Number"
            value={contactMap["Landline Number"]}
          />
        </Box>
      </Section>
    </Box>
  );
};

const FinanceAndProfession = () => (
  <Box
    sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: "#F6F6F6",
    }}
  >
    <GridSection columns={4} items={financialDetails} />
  </Box>
);

const Nominee = () => (
  <Box
    sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: "#F6F6F6",
    }}
  >
    <GridSection columns={5} items={nomineeDetails} />
  </Box>
);

const MedicalLifestyle = () => (
  <>
    <KeyValueTable title="Health Information" rows={healthInformationRows} />
    <Box sx={{ mt: 2 }}>
      <KeyValueTable title="Lifestyle Habits" rows={LifestyleHabitsRows} />
    </Box>
  </>
);

const Eia = () => (
  <Box
    sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: "#F6F6F6",
    }}
  >
    <GridSection columns={4} items={eiaDetails} />
  </Box>
);

const Generic = () => (
  <Box
    sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: "#F6F6F6",
    }}
  >
    <GridSection columns={4} items={genericDetails} />
  </Box>
);

const ApplicantProfile = () => {
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [selectedPhotoSrc, setSelectedPhotoSrc] = useState("");
  const [applicantInfoTab, setApplicantInfoTab] =
    useState<ApplicantInfoTab>("personalKyc");

  return (
    <Box sx={{ mt: 2 }}>
      <CustomAccordion title="Applicant Profile">
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#EBF1F5",
            borderRadius: "8px",
            marginTop: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  backgroundColor: "#B2C9D9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={() => {
                  setSelectedPhotoSrc(UserPhoto);
                  setOpenPhotoDialog(true);
                }}
              >
                <Box
                  component="img"
                  src={UserPhoto}
                  alt="User Photo"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  minWidth: "750px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ ...columnFlex }}>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#161616",
                      }}
                    >
                      Mr. Rudra Prakash Sangha
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#444444",
                      }}
                    >
                      DOB 02/01/1995
                    </Typography>
                  </Box>

                  <Badge
                    label="Male, 31 Years"
                    variant="Neutral"
                    size="medium"
                  />
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 2,
                    borderRadius: "8px",
                  }}
                >
                  {profileHighlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Box
                        key={item.label}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.5,
                        }}
                      >
                        <Box sx={{ color: "#063E6F" }}>
                          <Icon />
                        </Box>

                        <Box>
                          <Typography sx={{ fontSize: "14px", color: "#444" }}>
                            {item.label}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "16px",
                              color: "#161616",
                              fontWeight: 600,
                            }}
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ my: 2 }}>
          <CustomTabs
            tabs={applicantInfoTabs}
            value={applicantInfoTab}
            onChange={setApplicantInfoTab}
          />
        </Box>

        {applicantInfoTab === "personalKyc" ? (
          <PersonalKYC />
        ) : applicantInfoTab === "contactAddress" ? (
          <ContactAndAddress commAddressDetails={commAddressDetails} contactDetails={contactDetails}/>
        ) : applicantInfoTab === "financialProfession" ? (
          <FinanceAndProfession />
        ) : applicantInfoTab === "medicalLifestyle" ? (
          <MedicalLifestyle />
        ) : applicantInfoTab === "nominee" ? (
          <Nominee />
        ) : applicantInfoTab === "generic" ? (
          <Generic />
        ) : (
          applicantInfoTab === "eia" && <Eia />
        )}
      </CustomAccordion>

      <CustomDialog
        open={openPhotoDialog}
        onClose={() => setOpenPhotoDialog(false)}
        showCloseIcon={false}
        maxWidth="sm"
        fullWidth
        paperSx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        backdropSx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        contentSx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
          backgroundColor: "transparent",
        }}
      >
        <Box
          component="img"
          src={selectedPhotoSrc}
          alt="Expanded Photo"
          sx={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </CustomDialog>
    </Box>
  );
};

export default ApplicantProfile;
