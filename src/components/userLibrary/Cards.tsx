import React from 'react';

type PropsType = {
  title: string;
  author: string;
  genre: string;
  summary: string;
}

function Cards(props: PropsType) {
  return (
    <div className="col-md-4 mb-4 card"> 
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{props.author}</h6>
          <p className="card-text">{props.summary}</p>
          <p className="card-text"><small className="text-muted">{props.genre}</small></p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
