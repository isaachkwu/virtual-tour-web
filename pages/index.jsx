import Head from 'next/head'
import { useEffect, useState } from 'react'
import VistaContainer from '../components/VistaContainer'
import { useSelector, useDispatch } from 'react-redux'
import { gotoLocation } from '../redux/location/locationSlice'
import { playlistDetail, nextLocationName, previousLocationName } from '../data/playlistDetail'
import { hover, quitHover } from '../redux/hover/hoverSlice'

export default function Index() {
    const locationName = useSelector((state) => state.location.currentLocation)
    const hoverName = useSelector(state => state.hover.hoverHotspotName)
    const playlistName = useSelector((state) => state.location.currentPlaylist)
    const dispatch = useDispatch()
    const [cursorXY, setCursorXY] = useState({ x: null, y: null })
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
            console.log(`hover(${hotspotName})`)
            dispatch(hover({ name: hotspotName }))
        }
        window.quitHover = () => {
            console.log(`quitHover()`)
            dispatch(quitHover())
        }
        window.clickHotspot = (name) => {
            console.log(`clickHotspot(${name})`)
            // TODO: not implemented
        }
    }, [dispatch])
    useEffect(() => {
        console.log(locationName)
        if (locationName !== null) {
            if (window["setMediaByName"] && typeof window["setMediaByName"] === 'function') {
                window["setMediaByName"](locationName)
            }
        }
    }, [locationName])
    useEffect(() => {
        const canvas = document.querySelectorAll('[data-engine="three.js r135"]')?.[0];
        function handleMouseMove(e) {
            // var rect = canvas.getBoundingClientRect(),
            // scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
            // scaleY = canvas.height / rect.height;
            console.log('triggered')
            setCursorXY({ x: e.clientX, y: e.clientY })
        }
        console.log(canvas)
        canvas?.addEventListener('mousemove', handleMouseMove)
        return () => {
            // document.onmousemove = null
            canvas?.removeEventListener('mousemove', handleMouseMove, false)
        }
    }, [hoverName])
    useEffect(() => {
        console.log(cursorXY)
    }, [cursorXY])

    return (
        <div id='main' style={{height: '100vh', width: '100vw'}}>
            <VistaContainer />
            <div
                style={{
                    position: 'fixed',
                    bottom: 5,
                    right: 5,
                    width: 50,
                    height: 50,
                    backgroundColor: 'red',
                    zIndex: 1
                }}
                onClick={() => {
                    console.log('forward')
                    console.log(playlistDetail)
                    const next = nextLocationName(locationName ? locationName : 'ice', playlistDetail)
                    console.log(`next: ${next}`)
                    if (next) {
                        dispatch(gotoLocation({ locationName: next }))
                    }
                }}>
                {cursorXY.x}
            </div>
            <div
                style={{
                    position: 'fixed',
                    left: 5,
                    bottom: 5,
                    width: 50,
                    height: 50,
                    backgroundColor: 'blue',
                    zIndex: 1
                }}
                onClick={() => {
                    console.log('back')
                    const previous = previousLocationName(locationName ? locationName : 'ice', playlistDetail)
                    if (previous) {
                        dispatch(gotoLocation({ locationName: previous }))
                    }
                }}>
                    {cursorXY.y}
            </div>
            <div className="hoverDiv" 
                style={{ 
                    top: 100, 
                    left: 100, 
                    // display: hoverName === null ? 'none' : 'block' 
                }}>
                {hoverName}
            </div>
        </div>
    )
}
