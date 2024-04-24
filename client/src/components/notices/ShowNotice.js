import React from "react";
import '../notices/mainNotices.css';

const ShowNotice = ({ notice }) => {
  return (
    <div className="Show">
      <div class="show-notice">
        <div class="info">
          <h1>
            <span class="bold">Nội Dung Thông Báo: </span>
            {notice.form}
            </h1>
            <h1 class="sile">{notice.date}</h1>
        </div>
          <h1 class="title">{notice.topic}</h1>
          <p class="content">{notice.content}</p>
      </div>
    </div>
  );
};

export default ShowNotice;
