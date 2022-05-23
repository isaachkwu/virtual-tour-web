import Head from 'next/head'
import { useEffect, useState } from 'react'
import VistaContainer from '../components/VistaContainer'
import { useSelector, useDispatch } from 'react-redux'
import { gotoLocation } from '../redux/location/locationSlice'
import { playlistDetail, nextLocationName, previousLocationName } from '../data/playlistDetail'
import { hover, quitHover } from '../redux/hover/hoverSlice'

export default function Index() {
    const location = useSelector((state) => state.location.currentLocation)
    const playlist = useSelector((state) => state.location.currentPlaylist)
    const dispatch = useDispatch()
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
        console.log(location)
        if (location !== null) {
            if (window["setMediaByName"] && typeof window["setMediaByName"] === 'function') {
                window["setMediaByName"](location)
            }
        }
    }, [location])

    return (
            <div>
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
                        const next = nextLocationName(location ? location : 'ice', playlistDetail)
                        console.log(`next: ${next}`)
                        if (next) {
                            dispatch(gotoLocation({ locationName: next }))
                        }
                    }}>

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
                        const previous = previousLocationName(location ? location : 'ice', playlistDetail)
                        if (previous) {
                            dispatch(gotoLocation({ locationName: previous }))
                        }
                    }}>

                </div>
            </div>
    )
}
