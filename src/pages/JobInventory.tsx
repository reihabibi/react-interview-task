import React, { useState } from 'react'

import LeftCard from '../modules/JobInventory/components/LeftCard'
import DataGrid from '../modules/JobInventory/components/DataGrid'
import InventoryModal from '../modules/JobInventory/components/InventoryModal'
import DataGridHeader from '../modules/JobInventory/components/DataGridHeader'
import { Card } from 'antd'

const JobInventory = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
      <LeftCard />
      <Card size="small" title={<DataGridHeader openModal={openModal} />} style={{width: '100%'}} styles={{ header: { backgroundColor: '#F8F8FA' }}}>
        <DataGrid />
      </Card>
      <InventoryModal visible={modalVisible} onClose={closeModal} />
    </div>
  )
}

export default JobInventory