import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'

export default function CaludeRecipe(props){
    return(
        <>
            <section className="suggested-recipe-container" aria-live="polite">
                <h2>Chef Claude Recommends:</h2>
                <ReactMarkdown>{props.recipe}</ReactMarkdown>
            </section>
        </>
    )
}