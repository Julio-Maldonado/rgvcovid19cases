import React from 'react';
import { RESOURCES } from '../constants/constants';

const RGVResources = () => {
  return (
    <div className="press-releases-div">
        <ul className="nobull">
          {
            RESOURCES.map(({title, url, description}, i) => {
              return (
                <li key={i + title}>
                  {description}: <a href={url} className="App-link">{title}</a>
                </li>
              );
            })
          }
        </ul>
      <br />
    </div>
  );
};

export default RGVResources;
