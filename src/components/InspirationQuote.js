import React, { useState } from 'react';

function InspirationQuote(props) {
    const [quote, setQuote] = useState();
    import('inspirational-quotes').then((Quotes) => {
        setQuote(Quotes.getQuote());
    }).catch(()=> console.log("Couldn't load quotes"))

    
    //const { text, author } = Quotes.getQuote();
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