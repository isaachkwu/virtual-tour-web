import { useEffect, useState } from 'react'
import VistaContainer from '../components/VistaContainer'
import { useSelector, useDispatch } from 'react-redux'
import { gotoLocation } from '../redux/location/locationSlice'
import { playlistDetail, nextLocationName, previousLocationName } from '../data/playlistDetail'
import { hover, quitHover } from '../redux/hover/hoverSlice'
import Menubar from '../components/Menubar'
import ProgressBar from '../components/ProgressBar'

export default function Index() {
    const locationName = useSelector((state) => state.location.currentLocation)
    const hoverName = useSelector(state => state.hover.hoverHotspotName)
    const playlistName = useSelector((state) => state.location.currentPlaylist)
    const dispatch = useDispatch()
    const [cursorXY, setCursorXY] = useState({ x: null, y: null })

    // functions allowing 3dvista to communicate with react
    useEffect(() => {
        window.changeLocation = (name) => {
            console.log(`changeLocation(${name})`)
            playlistDetail.forEach(playlist => {
                if (playlist.paronamas.includes(name)) {
                    dispatch(gotoLocation({
                        locationName: name,
                        playlistName: playlist.name
                    }))
                }
            })
        }
        window.hover = (hotspotName) => {
            dispatch(hover({ name: hotspotName }))
        }
        window.quitHover = () => {
            dispatch(quitHover())
        }
        window.clickHotspot = (name) => {
            console.log(`clickHotspot(${name})`)
            // TODO: not implemented
        }
    }, [dispatch])

    // control 3dvista to change lcoation once redux location changed
    useEffect(() => {
        console.log(locationName)
        if (locationName !== null) {
            if (window["setMediaByName"] && typeof window["setMediaByName"] === 'function') {
                window["setMediaByName"](locationName)
            }
        }
    }, [locationName])

    // update cursorXY when mouse moves
    useEffect(() => {
        const handleHover2 = (e) => {
            setCursorXY({ x: e.clientX, y: e.clientY })
        }
        const handleHover = (e) => {
            // console.log(e.target)
            e.target.addEventListener('mousemove', handleHover2)
        }
        console.log('add mouseover')
        window.addEventListener('mouseover', handleHover)

        return () => {
            console.log('clean up')
            const cleanup = (e) => {
                // console.log(e.target)
                e.target.removeEventListener('mousemove', handleHover2)
            }
            window.removeEventListener('mouseover', handleHover)
            window.addEventListener('mouseover', cleanup)
            window.removeEventListener('mouseover', cleanup)
        }
    }, [])

    return (
        <div id='main' style={{height: '100vh', width: '100vw'}}>
            <VistaContainer />
            <Menubar />
            <ProgressBar />
            <div 
            className="hoverDiv" 
                style={{ 
                    top: cursorXY.y ? cursorXY.y + 30 : 0, 
                    left: cursorXY.x ? cursorXY.x + 30: 0, 
                    position: 'fixed',
                    width: 100,
                    height: 100,
                    backgroundColor: 'aqua',
                    zIndex: 1,
                    display: hoverName === null ? 'none' : 'block'
                }}>
            </div>
        </div>
    )
}
