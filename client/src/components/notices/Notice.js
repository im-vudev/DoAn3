import React, { useState } from "react";
import '../notices/mainNotices.css';

const Notice = ({ idx, notice, notFor }) => {
  return (
    notFor !== notice.noticeFor && (
      <div class="notice">
        <span class="dot">⚫</span>
        <h4 class="title">{notice.topic}</h4>
        <p class="content">{notice.content}</p>
    </div>
    )
  );
};

export default Notice;
