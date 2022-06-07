import styles from '../styles/Menubar.module.css'
import { useState } from 'react'
import { playlistDetail } from '../data/playlistDetail'
import { useSelector, useDispatch } from 'react-redux'
import { gotoLocation } from '../redux/location/locationSlice'

const Menubar = () => {
  const [expanded, setExpanded] = useState(false)
  const handleHamClicked = () => {
    setExpanded(!expanded)
  }

  const dispatch = useDispatch()
  const locationName = useSelector((state) => state.location.currentLocation)
  const playlistName = useSelector((state) => state.location.currentPlaylist)

  return (
    <div className={`${styles.menuContainer} ${expanded && styles.expanded}`} >
      <button className={`${styles.hamburger} ${styles.hamburgerCollapse} ${expanded && styles.isActive}`} type="button" onClick={handleHamClicked}>
        <span className={styles.hamburgerBox}>
          <span className={styles.hamburgerInner}></span>
        </span>
      </button>
      <div className={styles.menuContent}>
        <div className={`${styles.locationName} ${expanded && styles.expanded}`}>
          {locationName ? locationName : '禮堂'}
        </div>
        <div 
          className={`${styles.tourList} ${expanded && styles.expanded}`}>
          {playlistDetail.map((playlist) => (
            <div 
              key={playlist.name} 
              className={styles.playlistButton}
              onClick={() => {
                dispatch(gotoLocation({
                  locationName: playlist.paronamas[0],
                  playlistName: playlist.name
              }))}}>
              {playlist.displayName}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Menubar