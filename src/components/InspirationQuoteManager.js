
import CardSimple from 'layouts/cards/CardSimple';
import { CardContainer } from 'layouts/CardContainer';
import { CardElement } from "layouts/CardElement";
import React, { useEffect, useState } from 'react';
//import OverAllInspirationQuote from './OverAllInspirationQuote';

function InspirationQuoteManager() {
    const [quote, setQuote] = useState();
    useEffect(() => {
        import('inspirational-quotes').then((Quotes) => {
            setQuote(Quotes.getQuote());
        }).catch(() => console.log("Couldn't load quotes"))
    }, []);

    // function renderInspirationQuote(author, text, className) {
    //     return 
    // }
    return (<>
        {quote ?
            //Math.random() > 0.5 ? renderInspirationQuote(quote.author, quote.text, 'InpirationalQuote') : <OverAllInspirationQuote className={'AlwaysBottom InpirationalQuote'}  author={quote.author} text={quote.text}  renderQuote={renderInspirationQuote}></OverAllInspirationQuote>        
            <CardContainer>
                <CardElement>
                    <CardSimple shortDescription={quote.author} description={quote.text} />
                </CardElement>            
                <CardElement>
                    <CardSimple shortDescription={quote.author} description={quote.text} />
                </CardElement>
            </CardContainer>
            :
            "..."
        }
    </>
    )

}

export default InspirationQuoteManager;