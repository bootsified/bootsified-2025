import React from "react";
import Button from "@/components/Button";
import styles from "./StaticPortfolioInterstitial.module.css";

interface StaticPortfolioInterstitialProps {
  url: string;
  projectTitle: string;
  onContinue: () => void;
  onCancel: () => void;
}

const StaticPortfolioInterstitial: React.FC<StaticPortfolioInterstitialProps> = ({ projectTitle, onContinue, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Static Portfolio Website</h2>
        <p>
          The link you are about to visit is a <strong>static HTML recreation</strong> of the original {projectTitle} website, created for portfolio purposes only. Some features or functionality may not work as expected.
        </p>
        <div className={styles.actions}>
          <Button className={styles.button} onClick={onContinue} variant="reverse">
            Continue
          </Button>
          <Button className={styles.buttonPrimary} onClick={onCancel} variant="outlineReverse">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaticPortfolioInterstitial;
