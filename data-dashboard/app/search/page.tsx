'use client'
import Search from '../components/Search'
import Table from '../components/Table'
import PixelSnow from '../components/PixelSnow'

const page = () => {
  return (
    <>
      <div style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}>
        {/* Background Snow Effect */}
        <PixelSnow />
        
        {/* Foreground Content */}
        <div style={{ position: 'relative', zIndex: 10, padding: '2rem' }} className="flex flex-col gap-6">
          <Search />
          <Table />
        </div>
      </div>
    </>
  )
}

export default page