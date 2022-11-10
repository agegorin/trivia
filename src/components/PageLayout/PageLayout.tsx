import React from "react";

import Title from "antd/lib/typography/Title";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";

import "./PageLayout.css";

interface Props {
  header: React.ReactNode,
  children: React.ReactNode,
  footer: React.ReactNode
}

const PageLayout = ({header, children, footer}: Props) => {
  return <Layout className="PageLayout">
    <Header className="PageLayout__header"><Title>{header}</Title></Header>
    <Content className="PageLayout__content">{children}</Content>
    <Footer className="PageLayout__footer">{footer}</Footer>
  </Layout>
}

export default PageLayout;
