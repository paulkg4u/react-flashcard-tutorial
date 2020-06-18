import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {

    const [flip, setFlip] = useState(false);

    const frontEl = useRef()
    const backEl = useRef()

    const [height, setHeight] = useState('initial');

    function setMaxHeight(){
        const frontHeight = frontEl.current.getBoundingClientRect().height
        const backHeight = backEl.current.getBoundingClientRect().height
        setHeight(Math.max(frontHeight, backHeight, 100))
    }

    useEffect(() => {
        setMaxHeight()
    }, [flashcard.question, flashcard.answer, flashcard.options])

    useEffect(() =>{
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
    },[])
    return (
        <div 
            className={`card ${flip ? 'flip' : ''}`} 
            onClick={() => setFlip(!flip)}
            style={{height:height}}
        >
            <div className="front" ref={frontEl}>
                {flashcard.question}
                <div className="flashcard-options">
                    {flashcard.options.map(option => {
                        return <div className="flashcard-option">
                            {option}
                        </div>
                    })}
                </div>
            </div>

            <div className="back" ref={backEl}>
                {flashcard.answer}
            </div>
        </div>
    )
}
