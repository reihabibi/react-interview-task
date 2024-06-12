import React from 'react'

const NoServiceSelected = () => {
  return (
    <div style={{textAlign: 'center', margin: 'auto'}}>
        <img src="/NoServiceSelected.png" alt="No Service Selected Image" />
        <div style={{fontWeight: '600'}}>No Service Selected</div>
        <div>Please select a service on your left to proceed.</div>
    </div>
  )
}

export default NoServiceSelected