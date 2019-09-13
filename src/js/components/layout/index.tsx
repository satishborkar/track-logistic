import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = props => {
  const { children } = props;

  return (
    <div className="app-container">
      <section className="header-container">
        <div className="header layout">
          <h1>Shipment Management Portal</h1>
        </div>
      </section>
      <div className="content-container">
        <div className="content layout">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
