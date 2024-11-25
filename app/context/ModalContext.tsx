"use client";
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext<{
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
