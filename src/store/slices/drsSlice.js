import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  Row,
  RequirementRow,
  RiderRow,
  RiskCard,
  FirstUwDecisionRow,
  FinalUwDecisionRow,
  ApplicantInfoTab
} from '../../types/drs.types';

interface DrsState {
  // Application Overview
  applicationData: {
    rows: Row[];
    requirements: RequirementRow[];
    riders: RiderRow[];
    riskCards: RiskCard[];
  };

  // UW Decision
  uwDecision: {
    firstUwDecision: FirstUwDecisionRow[];
    finalUwDecision: FinalUwDecisionRow[];
  };

  // BRE Decision
  breDecision: {
    decision: string;
    decisionCode: string;
  };

  // Applicant Profile
  applicantProfile: {
    activeTab: ApplicantInfoTab;
    personalKyc: any;
    contactAddress: any;
    financialProfession: any;
    medicalLifestyle: any;
    nominee: any;
    generic: any;
  };

  // Medicals
  medicals: {
    completeBloodCount: any[];
    lipidProfile: any[];
    liverFunctionTest: any[];
    medicalRiskAnalytics: any[];
  };

  // Loading states
  loading: {
    applicationOverview: boolean;
    uwDecision: boolean;
    breDecision: boolean;
    applicantProfile: boolean;
    medicals: boolean;
  };

  // Error states
  errors: {
    applicationOverview: string | null;
    uwDecision: string | null;
    breDecision: string | null;
    applicantProfile: string | null;
    medicals: string | null;
  };
}

const initialState: DrsState = {
  applicationData: {
    rows: [],
    requirements: [],
    riders: [],
    riskCards: [],
  },
  uwDecision: {
    firstUwDecision: [],
    finalUwDecision: [],
  },
  breDecision: {
    decision: '',
    decisionCode: '',
  },
  applicantProfile: {
    activeTab: 'personalKyc',
    personalKyc: null,
    contactAddress: null,
    financialProfession: null,
    medicalLifestyle: null,
    nominee: null,
    generic: null,
  },
  medicals: {
    completeBloodCount: [],
    lipidProfile: [],
    liverFunctionTest: [],
    medicalRiskAnalytics: [],
  },
  loading: {
    applicationOverview: false,
    uwDecision: false,
    breDecision: false,
    applicantProfile: false,
    medicals: false,
  },
  errors: {
    applicationOverview: null,
    uwDecision: null,
    breDecision: null,
    applicantProfile: null,
    medicals: null,
  },
};

const drsSlice = createSlice({
  name: 'drs',
  initialState,
  reducers: {
    // Application Overview actions
    setApplicationData: (state, action: PayloadAction<Partial<DrsState['applicationData']>>) => {
      state.applicationData = { ...state.applicationData, ...action.payload };
    },
    setApplicationRows: (state, action: PayloadAction<Row[]>) => {
      state.applicationData.rows = action.payload;
    },
    setRequirements: (state, action: PayloadAction<RequirementRow[]>) => {
      state.applicationData.requirements = action.payload;
    },
    setRiders: (state, action: PayloadAction<RiderRow[]>) => {
      state.applicationData.riders = action.payload;
    },
    setRiskCards: (state, action: PayloadAction<RiskCard[]>) => {
      state.applicationData.riskCards = action.payload;
    },

    // UW Decision actions
    setUwDecision: (state, action: PayloadAction<Partial<DrsState['uwDecision']>>) => {
      state.uwDecision = { ...state.uwDecision, ...action.payload };
    },
    setFirstUwDecision: (state, action: PayloadAction<FirstUwDecisionRow[]>) => {
      state.uwDecision.firstUwDecision = action.payload;
    },
    setFinalUwDecision: (state, action: PayloadAction<FinalUwDecisionRow[]>) => {
      state.uwDecision.finalUwDecision = action.payload;
    },

    // BRE Decision actions
    setBreDecision: (state, action: PayloadAction<DrsState['breDecision']>) => {
      state.breDecision = action.payload;
    },

    // Applicant Profile actions
    setApplicantProfile: (state, action: PayloadAction<Partial<DrsState['applicantProfile']>>) => {
      state.applicantProfile = { ...state.applicantProfile, ...action.payload };
    },
    setActiveTab: (state, action: PayloadAction<ApplicantInfoTab>) => {
      state.applicantProfile.activeTab = action.payload;
    },

    // Medicals actions
    setMedicals: (state, action: PayloadAction<Partial<DrsState['medicals']>>) => {
      state.medicals = { ...state.medicals, ...action.payload };
    },

    // Loading actions
    setLoading: (state, action: PayloadAction<{ key: keyof DrsState['loading']; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value;
    },

    // Error actions
    setError: (state, action: PayloadAction<{ key: keyof DrsState['errors']; value: string | null }>) => {
      state.errors[action.payload.key] = action.payload.value;
    },

    // Reset actions
    resetDrsState: () => initialState,
  },
});

export const {
  setApplicationData,
  setApplicationRows,
  setRequirements,
  setRiders,
  setRiskCards,
  setUwDecision,
  setFirstUwDecision,
  setFinalUwDecision,
  setBreDecision,
  setApplicantProfile,
  setActiveTab,
  setMedicals,
  setLoading,
  setError,
  resetDrsState,
} = drsSlice.actions;

export default drsSlice.reducer;