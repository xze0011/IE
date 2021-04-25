import React from 'react';

/**
 * Name:AutoLink 
 * Function: will automatically transform text that match URL pattern into <a>
 * params are string that passing by Accordion component. 
 * used in Accordion component and /pages/subpages
 */

export default function AutoLink(props) {
  const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;
  const text = props.text; 
  return (
    <React.Fragment>
      {text.split(delimiter).map(word => {
        let match = word.match(delimiter);
        if (match) {
          let url = match[0];
          return <a target="_blank" href={url.startsWith('http') ? url : `http://${url}` } style={{color:'#e76f51'}}>click here</a>;
        }
        return word;
      })}
    </React.Fragment>
  );
}
