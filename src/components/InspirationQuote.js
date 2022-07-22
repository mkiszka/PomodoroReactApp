function InspirationQuote({ author, text, className }) {

    return (<>
        <figure className={className}>
            <blockquote>{text}</blockquote>
            <figcaption><cite>{author}</cite></figcaption>
        </figure >
    </>
    )

}

export default InspirationQuote;