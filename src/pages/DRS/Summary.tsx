import { Box, Container, Divider, Typography } from "@mui/material";
import CustomAccordion from "../../component/ui/Accordion/Accordion";
import type { RiskCard } from "../../types/drs.types";
import { HeartIcon, InfoIcon, TickIcon, WalletIcon } from "../../icons/Icons";
import UserPhoto from "../../assets/user-photo.svg";
import { centerFlex, columnFlex } from "../../utils/styles";
import Badge from "../../component/ui/Badge/Badge";
import CustomDialog from "../../component/ui/Dialog/Dialog";
import { useState } from "react";
import ApplicationOverview from "./ApplicationOverview";
import RequirementManagement from "./RequirementManagement";
import UWDecision from "./UWDecision";
import ApplicantProfile from "./ApplicantProfile";
import { GridSection } from "../../component/layout/GridSection";
import QuickLinks from "./QuickLinks";

const riskDetails: RiskCard[] = [
  {
    title: "Medical",
    desc: "BRE Medical Decision - STD",
    type: "medical",
    status: "success",
  },
  {
    title: "Financial",
    desc: "BRE Financial Decision - STD",
    type: "financial",
    status: "success",
  },
  {
    title: "Other Risks",
    desc: "BRE Decision - STD",
    type: "other",
    status: "success",
  },
];

const proposerDetails = [
  { label: "Marital Status", value: "Married" },
  { label: "Location", value: "Mumbai, India" },
  { label: "Occupation", value: "Salaried - Manager ICICI Bank" },
  { label: "Annual Income", value: "₹ 50,00,000" },
  { label: "Applied SA", value: "₹ 50,00,000" },
  { label: "Product", value: "ICICI Pru iProtect Care (Term Plan)" },
  { label: "Modal Premium/Channel", value: "11243/AG" },
  { label: "TRSA", value: "50,00,000" },
  { label: "TFESA", value: "50,00,000" },
];

const Summary = () => {
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [selectedPhotoSrc, setSelectedPhotoSrc] = useState("");

  return (
    <>
      <Container
        disableGutters
        sx={{
          marginTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              width: "calc(100% - 276px)",
              flexShrink: 0,
            }}
          >
            <CustomAccordion title="Overall Summary" defaultExpanded>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  Risk Analytics
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 2,
                  padding: 1,
                  borderRadius: "8px",
                }}
              >
                {riskDetails.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #d7d7d7",
                      borderRadius: "10px",
                      borderLeft: `6px solid ${
                        item.status === "success" ? "#39b54a" : "#f4a71d"
                      }`,
                      px: 2,
                      py: 1.5,
                      backgroundColor: "#ffffff",
                      cursor: "default",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {item.type === "medical" && <HeartIcon />}
                        {item.type === "financial" && <WalletIcon />}
                        {item.type === "other" && <InfoIcon />}
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#20242c",
                            fontFamily: "Mulish, sans-serif",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>

                      {item.status === "success" ? (
                        <Box
                          component="span"
                          sx={{
                            color: "#35A224",
                          }}
                        >
                          <TickIcon />
                        </Box>
                      ) : (
                        <Box
                          component="span"
                          sx={{
                            color: "#F58220",
                          }}
                        >
                          <TickIcon />
                        </Box>
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: "inline-flex",
                        mt: 1,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "999px",
                        border: "1px solid #d7d7d7",
                        backgroundColor: "#f7f7f7",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "12px",
                          color: "#5f5f5f",
                          lineHeight: 1.2,
                          fontFamily: "Mulish, sans-serif",
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2, px: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Typography
                  component="span"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  UW Summary for Proposer
                </Typography>
              </Box>

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

                      <GridSection
                        columns={3}
                        items={proposerDetails}
                        backgroundColor="#EBF1F5"
                      />

                      <Divider sx={{ my: 1 }} />

                      <Box
                        sx={{
                          ...columnFlex,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#1e1e1e",
                            fontSize: "14px",
                            fontWeight: 700,
                          }}
                        >
                          Remarks
                        </Typography>

                        <Typography
                          sx={{
                            color: "#1e1e1e",
                            fontWeight: 400,
                            fontSize: "14px",
                          }}
                        >
                          No adverse findings in family history, avocation,
                          occupation, or personal habits; no existing insurance.
                          Medicals non-adverse; financials adequate and viable
                          for full cover; no other risks identified.
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: "#fff",
                          ...centerFlex,
                          height: "40px",
                          borderRadius: "8px",
                          border: "1px solid #DDD",
                        }}
                      >
                        <Typography>BRE Decision:</Typography>
                        <Typography sx={{ pl: 1 }}>
                          <Typography
                            component="span"
                            sx={{
                              color: "#35A224",
                              fontWeight: 600,
                              fontSize: "18px",
                              pr: 0.5,
                            }}
                          >
                            Accept
                          </Typography>
                          <Typography
                            component="span"
                            sx={{
                              color: "#161616",
                              fontWeight: 600,
                              fontSize: "18px",
                            }}
                          >
                            - Standard (Full Cover)
                          </Typography>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CustomAccordion>

            <ApplicationOverview />
            <ApplicantProfile />
            <RequirementManagement />
            <UWDecision />

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

          <QuickLinks />
        </Box>
      </Container>
    </>
  );
};

export default Summary;
