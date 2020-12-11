const HtmlToReact = require('html-to-react').Parser;

const HtmlToReactParser = (props) => {
    
    const htmlToReact = new HtmlToReact();
    const result = htmlToReact.parse(props.content);
    
    return result;
}

export { HtmlToReactParser };