import React from 'react'
import PixelSnow from '@/app/components/PixelSnow'
import Details from '../../components/Details'


const page = async({params}: any) => {
    const {code} = await params;
  return (
    <>
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
        <div> 
            <Details code={code}/>
        </div>
    </div>
    </>
  )
}

export default page