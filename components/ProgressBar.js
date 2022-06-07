import { playlistDetail, nextLocationName, previousLocationName } from '../data/playlistDetail'
import { useSelector, useDispatch } from 'react-redux'
import { gotoLocation } from '../redux/location/locationSlice'
import styles from '../styles/ProgressBar.module.css'

const ProgressBar = () => {

  const dispatch = useDispatch()
  const locationName = useSelector((state) => state.location.currentLocation)

  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          console.log('back')
          const previous = previousLocationName(locationName ? locationName : 'ice', playlistDetail)
          if (previous) {
            dispatch(gotoLocation({ locationName: previous }))
          }
        }}>
          <i className={styles.arrowLeft}></i>
      </div>
      {
        playlistDetail.find(playlist => playlist.paronamas.includes(locationName))?.paronamas.map(location => (
          <span key={location} className={styles.dot}></span>
        ))
      }
      <div
        onClick={() => {
          console.log('forward')
          console.log(playlistDetail)
          const next = nextLocationName(locationName ? locationName : 'ice', playlistDetail)
          console.log(`next: ${next}`)
          if (next) {
            dispatch(gotoLocation({ locationName: next }))
          }
        }}>
          <i className={styles.arrowRight}></i>
      </div>
    </div>
  )
}

export default ProgressBar;