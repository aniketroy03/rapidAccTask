import React, {useEffect, useState} from 'react';
import Table from '../TableReport';
import styles from './styles.module.css';
import { data } from '../assets/data/data';   

function Report() {

    return (
      <div>
        <div className={styles.header}>
          <span className={styles.mathReport}>Match Reports</span>
          <span className={styles.totalItems}>{data.length}</span>
        </div>
        <div>
          <Table data={data} itemsPerPage={5} />
        </div>
      </div>
    );
}
  
export default Report;