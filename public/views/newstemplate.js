"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsTemplate = void 0;
const newsTemplate = (news) => {
    if ((news === null || news === void 0 ? void 0 : news.length) === 0) {
        return emptyNews();
    }
    let html = '<div class="row">';
    for (const newsItem of news) {
        html += `
  <div class="col-lg-6">
    <div class="card">
    <img src="http://localhost:3000/${newsItem === null || newsItem === void 0 ? void 0 : newsItem.cover}" class="card-img-top" style="height: 200px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">${newsItem.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          Автор: ${newsItem.author} </h6>
        <h6 class="card-subtitle mb-2 text-muted"> Дата создания: ${newsItem.createdAt}
        </h6>
        <p class="card-text">${newsItem.description}</p>
      </div>
    </div>
  </div>
  `;
    }
    html += '</div>';
    return html;
};
exports.newsTemplate = newsTemplate;
const emptyNews = () => {
    return `<h1>Список новостей пуст!</h1>`;
};
//# sourceMappingURL=newstemplate.js.map