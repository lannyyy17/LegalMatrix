"use client";

import React, { createContext, useContext, useState } from "react";

export type UserRole = "OFFICER" | "MAGISTRATE" | "MANUFACTURER" | "CONSUMER";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  badge: string;
  jurisdiction: string;
}

const ROLES_CONFIG: Record<UserRole, UserProfile> = {
  OFFICER: {
    id: "LM-OFF-402",
    name: "Rajesh Sharma",
    role: "OFFICER",
    roleTitle: "Senior Legal Metrology Inspector",
    badge: "Government Officer",
    jurisdiction: "Zone 4, Western Division, Mumbai",
  },
  MAGISTRATE: {
    id: "LM-MAG-101",
    name: "Justice V. K. Deshmukh",
    role: "MAGISTRATE",
    roleTitle: "Adjudicating Magistrate",
    badge: "Judicial Officer",
    jurisdiction: "State Legal Metrology Appellate Tribunal",
  },
  MANUFACTURER: {
    id: "MFG-REG-882",
    name: "Hindustan Unilever Compliance Desk",
    role: "MANUFACTURER",
    roleTitle: "Registered Manufacturer / Packer",
    badge: "Industry User",
    jurisdiction: "Pan-India License #MH-LM-2026-9021",
  },
  CONSUMER: {
    id: "CITIZEN-992",
    name: "Citizen Consumer",
    role: "CONSUMER",
    roleTitle: "Consumer Rights Advocate",
    badge: "Public Citizen",
    jurisdiction: "National Consumer Helpline 1915",
  },
};

interface AuthContextType {
  currentUser: UserProfile;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: ROLES_CONFIG.OFFICER,
  setRole: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>("OFFICER");

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  return (
    <AuthContext.Provider value={{ currentUser: ROLES_CONFIG[role], setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
