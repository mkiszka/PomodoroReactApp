import React, { useEffect, useState } from 'react';
import InspirationQuote from './InspirationQuote';

function InspirationQuoteManager({className}) {
    const [quote, setQuote] = useState();
    useEffect(() => {
        import('inspirational-quotes').then((Quotes) => {          
            setQuote(Quotes.getQuote());
        }).catch(() => console.log("Couldn't load quotes"))
    }, []);
 
    return (<>
        {quote ?
            <InspirationQuote author={quote.author} text={quote.text} className={className} />
            :
            "..."
        }
    </>
    )

}

export default InspirationQuoteManager;