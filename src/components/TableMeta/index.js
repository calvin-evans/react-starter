import React from 'react'
import styles from './TableMeta.module.scss'
import LoadingBlock from '../Loadingblock'

const TableMeta = ({ loading, currentItemCount, countedItemCount, totalItems }) => (
  <div className={styles.root}>
    <div className={styles.entryCount}>
      {!loading && countedItemCount > 0
        ? `Showing ${currentItemCount > countedItemCount ? countedItemCount : currentItemCount} of ${totalItems} ${countedItemCount !== 1 ? 'items' : 'item'}`
        : <LoadingBlock style={{ width: '11em', height: '1.2em' }} />
      }
    </div>
  </div>
)

export default TableMeta
