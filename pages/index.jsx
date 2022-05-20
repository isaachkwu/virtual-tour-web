import Head from 'next/head'
import { useEffect, useState } from 'react'
import VistaContainer from '../components/VistaContainer'

export default function Index() {
    const [step, setStep] = useState(null)
    useEffect(() => {
        console.log(step)
        if (step !== null) {
            if(window["setMediaByIndex"] && typeof window["setMediaByIndex"]  === 'function') {
                window["setMediaByIndex"](step)
            }
        } 
      }, [step])

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
                    setStep(step !== null ? step + 1 : 1)
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
                    if (step) {
                        console.log('back')
                        setStep(step - 1)
                    }
                }}>

            </div>
        </div>
    )
}
