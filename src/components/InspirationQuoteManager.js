
import React, { useEffect, useState } from 'react';
import InspirationQuote from './InspirationQuote';
//import OverAllInspirationQuote from './OverAllInspirationQuote';

function InspirationQuoteManager() {
    const [quote, setQuote] = useState();
    useEffect(() => {
        import('inspirational-quotes').then((Quotes) => {          
            setQuote(Quotes.getQuote());
        }).catch(() => console.log("Couldn't load quotes"))
    }, []);
 
    function renderInspirationQuote(author, text, className) {
        return <InspirationQuote author={author} text={text} className={className} />
    }
    return (<>
        {quote ?
            //Math.random() > 0.5 ? renderInspirationQuote(quote.author, quote.text, 'InpirationalQuote') : <OverAllInspirationQuote className={'AlwaysBottom InpirationalQuote'}  author={quote.author} text={quote.text}  renderQuote={renderInspirationQuote}></OverAllInspirationQuote>        
            renderInspirationQuote(quote.author, quote.text, 'InpirationalQuote')
            :
            "..."
        }
    </>
    )

}

export default InspirationQuoteManager;