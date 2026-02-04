import  { useState } from "react";
import yesGif from '../assets/yesGif.gif';
import noGif from '../assets/noGif.gif';

const noButtonTexts = [
    "No", "Are you sure?", "Really?", "Think again!", "Last chance!", "Try Yes!", "Ohh Yeh!"
];

const ValentineInvite = () => {
    // Initial beside-yes (inline) position for No button
    const initialBtnPos = { top: 0, left: 0 };
    const [noBtnPos, setNoBtnPos] = useState(initialBtnPos);
    const [showNoGif, setShowNoGif] = useState(false);
    const [showYesGif, setShowYesGif] = useState(false);

    const [noTextIndex, setNoTextIndex] = useState(0);
    console.log("noBtnPos", noBtnPos);
    console.log("noTextIndex", noTextIndex);
    const [yesClicked, setYesClicked] = useState(false);
    console.log("yesClicked", yesClicked);
    const [isOpen, setIsOpen] = useState(false);

    function getRandomPercent(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    const [noBtnMoving, setNoBtnMoving] = useState(false);
    // For card: move No to random spot except first, or back beside Yes after Yes!

    const handleShowNoGif = () => {
        setNoTextIndex(prev => (prev + 1) % noButtonTexts.length);
        setShowNoGif(true);
    };

    const handleNoClick = () => {
        if(noTextIndex === noButtonTexts.length - 2) handleShowNoGif()
        else {
            if (yesClicked || noBtnMoving) return;
            setNoBtnMoving(true); // show disabled and block further clicks
            // Card size = 100% = ~360x500 (set padding to keep in bounds)
            let newPos = {
                top: getRandomPercent(5, 70), // cover most of card
                left: getRandomPercent(5, 75)
            };
            setNoBtnPos(newPos);
            setNoTextIndex(prev => (prev + 1) % noButtonTexts.length);
            setTimeout(() => setNoBtnMoving(false), 400); // matches transition
        }
    };

    const handleYesClick = () => {
        setYesClicked(true);
        setNoBtnPos(initialBtnPos);
        setNoTextIndex(0);
        setShowYesGif(true);
        // alert('Yay! ❤️');
    };

    // Generate positions for 30 hearts, only once per load
    const heartCount = 40;
    const hearts = Array.from({ length: heartCount }, (_, i) => {
        const top = Math.random() * 98;
        const left = Math.random() * 98;
        return (
            <svg
                key={i}
                className="bg-heart"
                style={{ top: `${top}%`, left: `${left}%` }}
                width="18" height="18" viewBox="0 0 24 24" fill="none"
            >
                <path d="M12 21s-5.686-3.46-8-7.46c-2-3.37-.5-7.26 3-8.73 2.2-.79 4.35.11 5 1.59.65-1.48 2.8-2.38 5-1.59 3.5 1.47 5 5.36 3 8.73C17.686 17.54 12 21 12 21z" fill="#ff4f93" stroke="#D72660" strokeWidth="1" />
            </svg>
        );
    });

    return (
        <div className="container">
            {hearts}
            {!isOpen ? (
                <div className="envelope">
                    <div className="envelope-flap" />
                    <div className="envelope-front" />
                    <button className="heart-open-btn" onClick={() => setIsOpen(true)} aria-label="Open Letter">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 42s-14-8.35-14-18.5C10 14.58 16.48 10 24 16.13C31.52 10 38 14.58 38 23.5C38 33.65 24 42 24 42Z" fill="#FF4F93" stroke="#D72660" strokeWidth="2"/>
                        </svg>
                    </button>
                </div>
            ) : (
                <div className="card" style={{position: 'relative'}}>
                    <div className="card-content">
                    <div style={{ fontSize: '42px', marginBottom: '24px', color: '#ff4f93' }}>
                        <span role="img" aria-label="heart">💕</span>
                    </div>
                    <h1 style={{ fontFamily: 'cursive', color: '#e75480', marginBottom: '32px', fontWeight: 'bold' }}>
                        Jigish, will you be my Valentine?
                    </h1>
                    </div>
                    {(noTextIndex === 0) || showNoGif || showYesGif ? (
                        <>
                        <div className="card-bottom">
                        <div className="btn-row">
                            <button
                                className="yes-btn"
                                onClick={handleYesClick}
                                style={{zIndex: 3}}
                            >Yes</button>
                            <button
                                disabled={noBtnMoving || yesClicked || showNoGif}
                                onClick={handleNoClick}
                                aria-disabled={noBtnMoving || yesClicked || showNoGif}
                            >{yesClicked ? 'Ohh Yeh!' : noButtonTexts[noTextIndex]}</button>
                        </div>
                        {showYesGif && (
                          <img
                            src={yesGif}
                            alt="Yes GIF"
                            style={{ width: '220px', borderRadius: '12px' }}
                            />
                        )}

                        {showNoGif && !showYesGif && (
                            <img
                            src={noGif}
                            alt="No GIF"
                            style={{ width: '220px', borderRadius: '12px' }}
                            />
                        )}   
                        </div>                   
                          </>
                    ) : (
                        <>
                        {/* Yes stays centered near bottom always */}
                        <button
                            className="yes-btn"
                            onClick={handleYesClick}
                            style={{zIndex: 3, position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)'}}
                        >Yes</button>
                        {/* No Button moves/fixed elsewhere after click */}
                        <button
                            style={yesClicked
                                    ? { position: 'absolute', bottom: '40px', right: '40px', left: 'unset', top: 'unset', transition: 'all .5s cubic-bezier(.34,1.56,.64,1)' }
                                    : { position: 'absolute', top: `${noBtnPos.top}%`, left: `${noBtnPos.left}%`, transition: 'all .5s cubic-bezier(.34,1.56,.64,1)' }
                            }
                            disabled={noBtnMoving || yesClicked}
                            onClick={yesClicked ? undefined : handleNoClick}
                            aria-disabled={noBtnMoving || yesClicked}
                        >{noButtonTexts[noTextIndex]}</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ValentineInvite;
