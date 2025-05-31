// common/base.tsx
import React from "react";
import Header from "./header";

interface BasePageProps {
  headerText: string;
  children: React.ReactNode;
}

const BasePage: React.FC<BasePageProps> = ({ headerText, children }) => {
  return (
    <div className="min-h-screen p-6 body text-foreground">
      <Header headerText={headerText} />
      <main>{children}</main>
    </div>
  );
};

export default BasePage;
