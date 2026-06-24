'use client'
import Search from '../components/Search'
import Table from '../components/Table'
import PixelSnow from '../components/PixelSnow'

const page = () => {
  return (
    <>
      <div style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}>
        {/* Background Snow Effect */}
        <PixelSnow 
          color="#ffffff"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={200}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="square"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
        
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