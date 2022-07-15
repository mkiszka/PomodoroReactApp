import React, { useEffect, useState } from 'react';

function InspirationQuote(props) {
    const [quote, setQuote] = useState();
    useEffect(() => {
        import('inspirational-quotes').then((Quotes) => {          
            setQuote(Quotes.getQuote());
        }).catch(() => console.log("Couldn't load quotes"))
    }, []);
 
    return (<>
        {quote ?
            <figure>
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