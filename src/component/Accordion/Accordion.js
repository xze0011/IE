import React, { useState } from 'react';
import AutoLink from '../AutoLink/AutoLink';


const Accordion = (props) => {
    
    let indexPlus;

    const [active, setActive] = useState(0);

    const eventHandler = (e, index) => {
        e.preventDefault();
        setActive(index);
    }

    const indexCount = (index) => {
        indexPlus = index + 1;
        return indexPlus;
    }

    const data = props.content;

    return(
        <div>
            <form>     
                {data.map((tab, index) => (
                    <div key={index}>
                        <h3>
                            <button 
                                onClick={(e) => eventHandler(e, index)}
                                className={ active === index ? 'active' : 'inactive'}
                                aria-expanded={ active === index ? 'true' : 'false' }
                                aria-controls={ 'sect-' + indexCount(index) }
                                aria-disabled={ active === index ? 'true' : 'false' }
                                tabIndex={indexCount(index)}
                            >
                                <span className="title-wrapper">{tab.title}
                                    <span className={ active === index  ? 'plus' : 'minus'}></span>
                                </span>  
                            </button>
                        </h3>
                        <div id={ 'sect-' + indexCount(index) } className={ active === index  ? 'panel-open' : 'panel-close' }>
                                {tab.description.split('<br/>').map((i) => (<ul style={{color:'#000000'}}> <AutoLink text={i} /> </ul>))}
                        </div>
                    </div>
                    ))
                }
            </form>
        </div>
    );
}

export default Accordion;