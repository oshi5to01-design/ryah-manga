/* Single source of truth for all review metadata.
   Add one entry here each time a new review page is created. */

const REVIEWS = [
  {
    slug: "slam-dunk",
    title: "スラムダンク",
    titleRomaji: "SLAM DUNK",
    author: "井上雄彦",
    genre: ["shounen", "sports"],
    status: "completed",
    publishedDate: "2024-01-01",
    coverImg: "/img/covers/slam-dunk.jpg",
    excerpt: "バスケットボールを知らなくても心が震える。マンガという表現の可能性を最大限に引き出した、まぎれもない傑作。"
  },
  {
    slug: "death-note",
    title: "デスノート",
    titleRomaji: "DEATH NOTE",
    author: "大場つぐみ / 小畑健",
    genre: ["shounen", "thriller", "psychological"],
    status: "completed",
    publishedDate: "2026-04-23",
    coverImg: "/img/covers/death-note.jpg",
    excerpt: "人生ナンバーワンのマンガ。読み始めたら止まれない、寝られない。2000冊以上読んできた中で、これを超える読書体験にまだ出会っていない。"
  },
  {
    slug: "kingdom",
    title: "キングダム",
    titleRomaji: "KINGDOM",
    author: "原泰久",
    genre: ["seinen", "historical", "action"],
    status: "ongoing",
    publishedDate: "2026-04-23",
    coverImg: "/img/covers/kingdom.jpg",
    excerpt: "ここ数年で一番読み返している漫画。合従軍編・蕞の戦いが熱すぎて、何度読み返しても毎度面白い。羌瘣がつよかわいい。"
  },
  {
    slug: "hunter-x-hunter",
    title: "ハンターハンター",
    titleRomaji: "HUNTER×HUNTER",
    author: "冨樫義博",
    genre: ["shounen", "action", "battle"],
    status: "ongoing",
    publishedDate: "2026-04-23",
    coverImg: "/img/covers/hunter-x-hunter.jpg",
    excerpt: "念能力が出てきてから別次元に面白い。自分と向き合い、自分だけの能力を定めていく思慮深さに惹かれる。キメラアント編は賛しかない、涙ちょちょぎれる。"
  }
];

/* Render a review card element from metadata */
function renderReviewCard(r) {
  const statusLabel = r.status === 'completed' ? '完結' : '連載中';
  const statusClass = r.status === 'completed' ? 'tag--completed' : 'tag--ongoing';
  return `
    <article class="review-card">
      <a href="/reviews/${r.slug}/" class="review-card__link">
        <div class="review-card__img-wrap">
          <img src="${r.coverImg}" alt="${r.title} 表紙" loading="lazy"
               onerror="this.src='/img/covers/no-image.jpg'">
        </div>
        <div class="review-card__body">
          <div class="review-card__meta">
            <span class="tag ${statusClass}">${statusLabel}</span>
            ${r.genre.slice(0,2).map(g => `<span class="tag tag--genre">${genreLabel(g)}</span>`).join('')}
          </div>
          <h3 class="review-card__title">${r.title}</h3>
          <p class="review-card__author">${r.author}</p>
          <p class="review-card__excerpt">${r.excerpt}</p>
        </div>
      </a>
    </article>`;
}

function genreLabel(slug) {
  const map = {
    shounen: '少年', shoujo: '少女', seinen: '青年', josei: '女性',
    sports: 'スポーツ', isekai: '異世界', romance: '恋愛',
    action: 'アクション', mystery: 'ミステリー', horror: 'ホラー',
    comedy: 'ギャグ', fantasy: 'ファンタジー', scifi: 'SF',
    slice_of_life: '日常', historical: '歴史'
  };
  return map[slug] || slug;
}

/* Render a grid of cards into a target element */
function renderReviewGrid(targetId, reviews) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = reviews.map(renderReviewCard).join('');
}
