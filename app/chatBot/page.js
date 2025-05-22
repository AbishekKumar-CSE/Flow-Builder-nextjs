'use client'

import React, { useState, useEffect } from 'react'

const page = () => {

    const [botData, setBotData] = useState(null)

    useEffect(() => {
        setBotData(localStorage.getItem('flow-key'))
    })

    console.log('botData', botData)

  return (
    <div>
      
    </div>
  )
}

export default page
