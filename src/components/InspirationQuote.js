import React, { useEffect, useState } from 'react';

function InspirationQuote({className}) {
    const [quote, setQuote] = useState();
    useEffect(() => {
        import('inspirational-quotes').then((Quotes) => {          
            setQuote(Quotes.getQuote());
        }).catch(() => console.log("Couldn't load quotes"))
    }, []);
 
    return (<>
        {quote ?
            <figure className={className}>
                <blockquote>{quote.text}</blockquote>
                <figcaption><cite>{quote.author}</cite></figcaption>
            </figure >
            :
            "..."
        }
    </>
    )

}

export default InspirationQuote;