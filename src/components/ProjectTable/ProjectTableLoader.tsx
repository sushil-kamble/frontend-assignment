import React from "react";
import styles from "./ProjectTableLoader.module.css";

interface ProjectTableLoaderProps {
  rowsCount: number;
}

const ProjectTableLoader: React.FC<ProjectTableLoaderProps> = ({
  rowsCount,
}) => {
  return (
    <div className={styles.skeletonTable}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonCell}></div>
        <div className={styles.skeletonCell}></div>
        <div className={styles.skeletonCell}></div>
      </div>
      {Array.from({ length: rowsCount }).map((_, index) => (
        <div key={index} className={styles.skeletonRow}>
          <div className={styles.skeletonCell}></div>
          <div className={styles.skeletonCell}></div>
          <div className={styles.skeletonCell}></div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTableLoader;
